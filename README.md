# Kommentar til studass:
- Ideelt sett ville jeg refaktorert mye her. Jeg ville flyttet alle metodene som kommuniserer med backend ut i en egen servicefil (som ligger under "components/project/Services") for å gjøre komponentene mer rene og håndtere API-kall på ett sted. 
- Jeg ville også forbedre logikken for visningen av et posjekt, men hadde dessverre ikke tid, ønsket å flytte edit-logikken i en egen komponent og route så noe som '/project/project-id/edit'
- Jeg ville også erstattet mesteparten av CSS'en med TailwindCSS for å få en konsistent og enklere styling. 
- Til slutt ville jeg brukt Next.js-routes i stedet for React Router, siden Next gir flere fordeler som optimaliserte routes og SSR (Server-Side Rendering). 
- Dessverre hadde jeg kun tid til grunnimplementeringen :)
