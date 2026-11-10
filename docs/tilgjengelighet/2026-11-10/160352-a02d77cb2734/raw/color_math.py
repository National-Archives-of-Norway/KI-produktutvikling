"""Focused conservative sRGB layer-bound review of the original 86 axe candidates.
Usage: python3 contrast86-bounds.py styles.json results.json
No browser execution or editing. Original axe results remain unchanged.
"""
import json,re,sys
from pathlib import Path

def colors(s):
 out=[]
 for m in re.finditer(r'rgba?\(([^)]+)\)|color\(srgb ([^)]+)\)',s):
  x=[float(z) for z in re.findall(r'[\d.]+',m[1] or m[2])]
  out.append(tuple(([c/255 for c in x[:3]] if m[1] else x[:3])+[x[3] if len(x)>3 else 1]))
 for m in re.finditer(r'oklab\(([^)]+)\)',s):
  x=[float(z) for z in re.findall(r'[-+]?(?:[\d]*\.)?[\d]+',m[1])];L,a,b=x[:3]
  l=(L+.3963377774*a+.2158037573*b)**3
  m0=(L-.1055613458*a-.0638541728*b)**3
  t=(L-.0894841775*a-1.291485548*b)**3
  linear=[4.0767416621*l-3.3077115913*m0+.2309699292*t,-1.2684380046*l+2.6097574011*m0-.3413193965*t,-.0041960863*l-.7034186147*m0+1.707614701*t]
  assert all(-.0001<=v<=1.0001 for v in linear),linear
  rgb=[12.92*v if v<=.0031308 else 1.055*max(v,0)**(1/2.4)-.055 for v in linear]
  out.append(tuple([min(1,max(0,v)) for v in rgb]+[x[3] if len(x)>3 else 1]))
 return out

def split(s):
 out=[];start=depth=0
 for i,c in enumerate(s):
  if c=='(':depth+=1
  if c==')':depth-=1
  if c==',' and depth==0:out.append(s[start:i]);start=i+1
 out.append(s[start:]);return out

def paint(lo,hi,cs):
 vals=[[c[i]*c[3]+b*(1-c[3]) for c in cs for b in [lo[i],hi[i]]] for i in range(3)]
 return [min(v) for v in vals],[max(v) for v in vals]

def bg(lo,hi,a):
 cs=colors(a['bg']);assert cs,a
 lo,hi=paint(lo,hi,cs)
 for layer in reversed(split(a['image'])):
  if layer.strip()=='none':continue
  cs=colors(layer);assert cs,layer
  # All stop colours and all alpha endpoints; ignores spatial masks/position.
  lo,hi=paint(lo,hi,cs)
 return lo,hi

def lum(c):
 return sum((v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4)*w for v,w in zip(c,[.2126,.7152,.0722]))

def ratio(f,lo,hi):
 lf,l0,l1=lum(f),lum(lo),lum(hi)
 return 1 if l0<=lf<=l1 else min((max(lf,b)+.05)/(min(lf,b)+.05) for b in [l0,l1])
assert ratio([1]*3,[0]*3,[0]*3)==21
assert ratio([0]*3,[1]*3,[1]*3)==21
assert paint([0]*3,[0]*3,[(1,1,1,.5)])==([.5]*3,[.5]*3)
