<div align="center">

<img src="./public/thumbnail.png" alt="Cookie React Thumbnail" width="400" heigh="auto" />

# 🍪 Cookie Banner para React y TypeScript

</div>

¡Usa este brutal Cookie Banner en tus proyectos con React para gestionar el uso de YouTube iFrames, Google Maps, Google Analytics, y demás!

## ⭐️ Info

El proyecto utiliza también una variable para detectar si el usuario ha interactuado ya con el Banner. Si lo ha hecho una vez, no volverá a aparecer a no ser que hagamos click en el botón de la cookie.

Para cambiar el estilo principal del Banner, échale un vistazo a los colores definidos en la App.css.

## 🪜 Mejoras

- [x] El sistema del context, ya que podríamos evitar repetir variables
- [ ] El styling. Pasar todo a TailwindCSS. Por ahora está todo a medias.

## 🪜 Debug

Hay dos formas de hacer debug en este proyecto:

- O bien haciendo uso del modal `Debug.tsx`, que nos ayudará desde el cliente a ver el estado de las variables y a hacer toggle con los setters.
- O bien utilizando el `npm package debug`, que nos ayudará en los casos en los que necesitamos más prosa.
