# Ionic OpenLayers

## Created with

```
ionic start olapp sidemenu --type=angular --capacitor
ng update @angular/cli @angular/core
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
npm i ol
```

Add to `src/global.scss`:

```
/* OpenLayers CSS */
@import "~ol/ol.css";
```
