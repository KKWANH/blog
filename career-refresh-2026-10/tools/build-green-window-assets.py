"""Original rounded green field; no text/portrait. Uses the existing Pillow setup."""
from pathlib import Path
from PIL import Image,ImageDraw
import math

REPO=Path(r'C:\Projects\blog')
size=768
image=Image.new('RGBA',(size,size))
pixels=image.load()
for y in range(size):
    for x in range(size):
        u,v=x/(size-1),y/(size-1)
        t=max(0,min(1,.55*u+.45*(1-v)))
        dark=(7,37,25);light=(69,112,65)
        glow=max(0,1-math.hypot(u-.77,v-.2)/.8)*.24
        color=tuple(round((dark[i]*(1-t)+light[i]*t)*(1-glow)+(161,184,111)[i]*glow) for i in range(3))
        pixels[x,y]=(*color,255)
mask=Image.new('L',(size,size));ImageDraw.Draw(mask).rounded_rectangle((0,0,size-1,size-1),radius=155,fill=255)
image.putalpha(mask)
draw=ImageDraw.Draw(image)
draw.rounded_rectangle((9,9,size-10,size-10),radius=148,outline=(183,211,143,80),width=5)
for filename,output_size in [('icon.png',192),('apple-icon.png',180)]:
    image.resize((output_size,output_size),Image.Resampling.LANCZOS).save(REPO/'app'/filename,optimize=True)
image.resize((64,64),Image.Resampling.LANCZOS).save(REPO/'app/favicon.ico',sizes=[(16,16),(32,32),(48,48),(64,64)])
preview=REPO/'public/brands/green-window-preview.png'
image.resize((256,256),Image.Resampling.LANCZOS).save(preview,optimize=True)
print('Generated original green-window PNG/ICO assets.')
