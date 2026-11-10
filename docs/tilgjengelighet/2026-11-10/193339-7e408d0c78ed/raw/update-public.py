from pathlib import Path
import re,json
root=Path.cwd();p=root/'src/content/accessibility.ts';s=p.read_text()
for principle in [2,3]:
 s=re.sub(r'  \{\n    title: "Prinsipp '+str(principle)+r':.*?(?=\n  \{\n    title:|\n\];)', '',s, count=1,flags=re.S)
known=[{'title':'Prinsipp 2: Mulig å betjene','requirements':[{'id':'2.2.2','title':'Pause, stopp, skjul','description':'På prissiden kan varselet om eldre priskontroll dukke opp automatisk mens du leser. Det finnes ingen kontroll for å pause eller skjule denne oppdateringen. Dette kan forstyrre lesingen og flytte innholdet. Animasjonen på forsiden har en egen pausefunksjon.','alternative':'Du kan lese datoen for siste kontroll og følge lenken til leverandørens prisliste.'}]},{'title':'Prinsipp 3: Forståelig','requirements':[{'id':'3.1.1','title':'Språk på siden','description':'PDF-vedlegget om AI enablement-teamet har engelsk hovedspråk i filen, selv om innholdet er på norsk. Deler av teksten er også merket som engelsk. Dette kan gi feil uttale i hjelpemidler.','alternative':'Kontakt oss dersom du trenger innholdet som norsk tekst i et annet tilgjengelig format.'},{'id':'3.1.2','title':'Språk på deler av innhold','description':'Flere norske setninger i PDF-vedlegget, særlig på side 4–6, er merket som engelsk. Hjelpemidler kan derfor behandle disse tekstpartiene som engelsk.','alternative':'Kontakt oss dersom du trenger innholdet som norsk tekst i et annet tilgjengelig format.'}]}]
s += '\n\nexport const knownAccessibilityBreaches = '+json.dumps(known,ensure_ascii=False,indent=2)+';\n';p.write_text(s)
p=root/'src/app/tilgjengelighet/page.tsx';s=p.read_text().replace('import { unresolvedAccessibilityRequirements }', 'import { knownAccessibilityBreaches, unresolvedAccessibilityRequirements }')
old='''      <p>
        Det er for tiden ingen bekreftede, åpne brudd i det undersøkte utvalget.
        Samlet samsvar er fortsatt uavklart fordi vurderingen ikke er fullført.
      </p>'''
new='''      {knownAccessibilityBreaches.map((group) => (
        <section key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.requirements.map((requirement) => (
              <li key={requirement.id}>
                <strong>{requirement.id} {requirement.title}</strong>
                <p>{requirement.description}</p>
                <p>{requirement.alternative}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}'''
assert old in s;s=s.replace(old,new)
s=s.replace('samt målrettede PDF-kontroller.', 'samt målrettede PDF-kontroller av blant annet språkmerking.')
p.write_text(s)
p=root/'docs/tilgjengelighet/TILGJENGELIGHETSERKLAERING.md';s=p.read_text();start=s.index('## Kjente brudd');end=s.index('## Forhold som ikke er ferdig vurdert',start)
body='## Kjente brudd\n\n'
for group in known:
 body+='### '+group['title']+'\n\n'
 for q in group['requirements']:body+=f"- **{q['id']} {q['title']}:** {q['description']} {q['alternative']}\n"
 body+='\n'
body+='Du kan be om hjelp eller innhold i et annet format gjennom kontaktkanalen nedenfor.\n\n'
s=s[:start]+body+s[end:];s=s.replace('Følgende 13 krav','Følgende 8 krav')
for principal in [2,3]:
 s=re.sub(r'### Prinsipp '+str(principal)+r':.*?(?=### Prinsipp|\nDu kan lese ressursene)', '',s,count=1,flags=re.S)
s=s.replace('samt målrettede PDF-kontroller.', 'samt målrettede PDF-kontroller av blant annet språkmerking.')
p.write_text(s)
Path('/private/tmp/portal-a11y-060/known-breaches.json').write_text(json.dumps(known,ensure_ascii=False,indent=2))
