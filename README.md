# DoseBot
> *Keep your medications on track*

DoseBot is a free, open-source, and privacy-friendly medication reminder app for Android/IOS*. The aim is to provide an easier way of managing and keeping track of prescribed or OTC medications

## Features
- Interactive system notifications
- Inventory management
- Travel Calculator
- Medication History/Progress
- Multi-Lingual (currently English, Persian)
- Material design with Light/Dark support

> This app is currently under heavy development therefore it's not ready for everyday use 

## ScreenShots

## Downloads
WIP

## Contributing

## Development

- First, install all dependencies via `pnpm i`
- Start dev server via `pnpm dev`
- Storybook remote server will run simultaneously at http://localhost:6006

Note: This project requires a custom build of Expo GO due to the use of libraries with native code. You can either build your own or download a prebuilt one from the [Releases section](https://github.com/vahidtvj/DoseBot/releases). Development builds are tagged in the format `dev-<commit-sha>`. This is required whenever new native code is added to the project.

To build your own version: `eas build --profile development`