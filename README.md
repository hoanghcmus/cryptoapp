This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 3: Mockup Design
<img width="540" height="1170" alt="Design" src="https://github.com/user-attachments/assets/a6ac29da-6d8c-4073-aee7-9925a08a5d87" />

## 4: Techstack
| Library/Framework | Category | Description |
| :--- | :--- | :--- |
| **redux** | State Management | Manages application state in a predictable way. |
| **redux-persist** | Data Persistence | Persists Redux store data to local storage. |
| **react-query** | Data Fetching & Caching | Manages, fetches, caches, and updates server-side data. |
| **nativewind** + **tailwindcss** | Styling | Allows styling React Native components with Tailwind CSS. |
| **jest** | Testing | A JavaScript testing framework for unit testing. |


## 5: Highlights 
- **DemoScreen**: Map to **DemoActivity** in Native Android 
- **CurrencyList**: Map to **CurrencyListFragment** in Native Android 
- **Currency Data flow**: `load Local data` for **CurrencyList** => `fetch Backend data` => `update Local data` ==> `reflect Local data change` for **CurrencyList**
- **fetchAllCurrencies**: 
   + **For Android**: Call Native Module to fetch mock data 
   + **For iOS**: Response JS mock data from sample dataset 
- **Other APIs fetch currencies (Crypto | Fiat)**: Response JS mock data from sample dataset 
- **All IO operations**: Run on `Another thread (JS, Worker)` (**not** `UI | Main thred`)
- **Unit test**: Applied for `DemoScreen`, `CurrencyList`, and `api`
   + Run `yarn test` to run all `test suites` and `test cases`
   + **Summary of Approach**:
   
| Layer      | What to Test                              | How to Mock/Test                                                                 |
|------------|-------------------------------------------|----------------------------------------------------------------------------------|
| **API**    | Data fetching logic (mock data sets), platform-specific branching (`Platform.OS`). | `jest.mock`, `Object.defineProperty` (to mock `Platform.OS`), and `jest.fn()` to mock native module calls. |
| **UIs** | Conditional rendering (loading, error, data), user interactions (button clicks, search input), data filtering, Redux action dispatching. | `@testing-library/react-native`, mock `useQuery` (from `@tanstack/react-query`), mock `useDispatch` and `useCurrencyList` (from `react-redux`). |
| **Redux**  | Actions dispatched.                       | Mock `useDispatch` and check if the mock function is called with the correct action payloads. |
   + **Test resuls**:

![Test Results](https://github.com/user-attachments/assets/886751be-46e4-4431-bb5e-2a00a6ef613b)

## 6: Result Demos

***Normal state***
***
![Normal state](https://github.com/user-attachments/assets/37667b8a-692b-4fae-9212-4accd7d7a73f)

***Filter state***
***
![Filter state](https://github.com/user-attachments/assets/12ea7bbf-9a89-4758-beea-1fb45fc0ed00)

***Search state***
***
![Search state](https://github.com/user-attachments/assets/b5c9b202-e6a7-4ed7-bf03-92b666a8e398)

***Empty state***
***
![Empty state](https://github.com/user-attachments/assets/419dfb95-e75d-4c93-a5c0-21b0443c656b)


[Demo Video of Currency App](https://youtube.com/shorts/sgSptFLcnH8?feature=share)


# 🙏 Thank you for your time! ❤️ 
