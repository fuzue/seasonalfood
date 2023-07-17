# Season foods

This is a simple app to show the current fruits and vegetables in different months in Italy.
In the future we expect to add other countries as soon as we go data for that.

![season-fruit](https://github.com/fuzue/seasonfood/assets/272892/7956b59e-074a-4a27-ba7c-3f1d00c8897c)

The project is written in React/Typescript using [MUI](https://mui.com/) library for the UI. The Android app is built using [Capacitor](https://capacitorjs.com/).

# How to use

Just go to https://fuzue.github.io/seasonfood/ ans this will redirect you to the current month. Mobile app coming soon to F-Droid, Play and IOS store.

# How to build

1. npm i
2. npm run build

## Build Android app

First you do need to have Android SDK and Anbdroid Studio installed. After that you can open the project in Android Studio with:

1. npm run build-app
2. ANDROID_SDK=the-path-top-android-sdk CAPACITOR_ANDROID_STUDIO_PATH=the-path-to-android-studio/bin/studio.sh npm run run-app-android

# Data sources

Source of data for fruits and vegetables from [Slow Food Italy Guide](https://www.slowfood.it/wp-content/uploads/blu_facebook_uploads/2014/09/ita_guida_consumo_b.pdf)


