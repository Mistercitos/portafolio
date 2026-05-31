# public/images

Todas las imágenes del sitio. PNG en todos los casos — `next/image` los optimiza al servir.

**Plan completo, tamaños, mood y paleta por sección:**
ver `../../IMAGENES.md` en la raíz del workspace (junto a los CVs).

## Estructura

```
images/
├── og/             OG fallback (1200×630)
├── about/          portrait.png (1600×2000, 4:5)
├── work/           Case studies — uno por proyecto
│   ├── wolf/
│   ├── outbuild/
│   ├── lfi/
│   ├── stockai/
│   ├── astros/
│   ├── deliverynow/
│   └── plannyme/
└── blog/           Por post
    ├── tres-formas-de-crear-un-job/
    ├── tokens-themes-contratos/
    └── designers-que-codifican/
```

## Tamaños (memoria rápida)

- **Hero** 16:9 → 2400×1350
- **Gallery** 4:3 → 1600×1200
- **Process** 3:2 → 1800×1200
- **Mobile** 9:19.5 → 1170×2532
- **Portrait** 4:5 → 1600×2000
- **OG** 1.91:1 → 1200×630

Target peso: <500 KB por archivo. Pasar por TinyPNG / Squoosh antes de commit.
