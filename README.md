# SortLab - Sorting Visualizer by Nash

---
<a href="https://sortlab.click/" target="_blank">SortLab</a> is a sorting algorithms visualizer built based on Next.js with TypeScript. (Also have an Electron version as a bonus!)

I created this project in order to help people (including myself) understand how each sorting algorithm works, as well as to provide example for anyone who interest in making their own sorting visualizer.

I hope this project will be helpful for beginners and a great refresher for intermediates.

### Setup Guide

Install dependencies

```
cd sort-lab
npm install
```

Run the project

```
//1. Web App
npx nx serve web-app

//2. Electron App (if in development, must run web-app first)
npx nx serve electron-app
```

Run E2E test for web app (don't forget to run web app first)

```
npx nx e2e web-app-e2e --watch
```

Build the project

```
//1. Web App
npx nx build web-app --prod

// 2. Electron App
npx nx build electron-app

// 3. Package the Electron app (Configuration available on maker.options.json inside “options” folder in electron-app)
npm exec nx package electron-app
// package can be found at dist/packages
```

---

# Extras: Behind the Scene 

## Ch.1 My Motivation 

- Sorting animation looks so cool! ( I want to make one.)
- Revisit my algorithm knowledge ( Algorithms, Data structure, Big (O) notation, Time and space complexity.)
- Apply software design principle (There are so many sorting algorithm to implement, therefore I should design the project in a scalable manner)
- Refresh my web dev skill ( I haven’t touch JavaScript for frontend for a while)
- Have a proud project to show case. ( Yeah!)
- Create a website for everyone include myself to learn/review sorting algorithms.

## Ch.2 Research

- [Clément Video - The Projects That Got Me Into Google](https://youtu.be/n4t_-NjY_Sg?t=519 "https://youtu.be/n4t_-NjY_Sg?t=519") ( His video is the first reason I want to build one, it looks so cool, and his [tutorial](https://www.youtube.com/watch?v=pFXYym4Wbkc) give me a good start)
- Googling while implementing ( I won’t make this so far without them)

  - GeeksforGeeks

  - StackAbuse
  - sortvisualizer.com

  - StackOverflow
  - And many more.

## Ch.3 Implementation

- Design UI via Figma ( I love the 3d modern icon design!)

  - View my design [here](https://www.figma.com/file/537GzOKmDzNgRW4XdgSS7H/Project-01---Sorting-Visualizer?node-id=0%3A1)

- Project Structure

  - 1st phase ( web app only) - use Next.js default project structure.

  - 2nd phase (web-app + electron )- use [Nx](https://nx.dev/) for monorepo management.  


```
<workspace name>/
├── apps/
│   ├── electron-app/
│   ├── web-app/
│   └── web-app-e2e/
├── libs/
├── tools/
├── nx.json
├── package.json
├── tsconfig.json
└── tslint.json
```

- Core Design Pattern

  - Use Strategy Pattern for changing sorting algorithm.  

  - Use Singleton for managing array via context provider ( array is used by many components/hooks)  


- Project Management ( I used ClickUp to manage the project)

  - View my Clickup board [here](https://sharing.clickup.com/36800995/b/h/6-198892556-2/2c944e8c276694b)

## Ch.4 Result

- This project is deployed at Vercel in which you can visit here.
- For electron version, I have upload two version Mac, Window, you can download and give a try:

  - [Mac (arm64)](https://drive.google.com/file/d/1hwBdi1g7PjOg0BzQPS5MZQXEICXnDSUL/view?usp=sharing)
  - [Window](https://drive.google.com/file/d/1oQnVjxZu5_3qdSLpGZOJc_Vc_0wqHNWp/view?usp=sharing "https://drive.google.com/file/d/1oQnVjxZu5_3qdSLpGZOJc_Vc_0wqHNWp/view?usp=sharing")

- This project took around 75 hours to finished. ( From 19 Aug - 30 Sep)

- Bonus: Electron and Nx

  - Why? I’m curious about how hard it is to share a codebase from Next.js to Electron

    - Turned out that there is a simple method to do so, which is to mirror the remote web app url into electron app. Currently, I used this approach in the project. Although at first I aimed to use another approach which is to create shared library between the web-app and electron-app. (Which is the reason why I use NX for managing monorepo). But, I didn’t do that because I’m new to electron and still not quite sure how to fit the next.js framework into electron. Although there is a [Nextron](https://github.com/saltyshiomix/nextron) to start a template for, integrating them with NX workspace is quite hard for me. So to sum up , due to the time constraint, I use the remote URL as a temporal solution. ( Note: I published my blog which dicuss about the 4 methods on how to share a codebase from web app to electron app [here](https://medium.com/@nutdanai.kpjr/sharing-code-between-web-electron-apps-summary-1d9e417ee83d)) In the future I aimed to introduce extra features to the electron-app such as give a native context menu, a notification after sorting is finished. 

## Ch.5  Conclusion

- Problems I found included useContext and useCustomHook inconsistency, there are many time that I use arrayContext to update the array, but it ends up that the sorting algor still sort the algorithm based on the old array (and that mess up the sorting algor)

  - So I learned to use the react useRef, which mean that everytime I update the array, the sorting algorithm should also re-fetch the array from useRef as well , ( you can see this in bubble sorting algor)  With useRef, the sorting algorim is working properly.

- Another problem that I found is the implementation of each algorithm logic is mixing with UI logic (not pure) so maybe it better to use a Command pattern like write a function to generate a list of array manipulating instructions first,  then use those instructions to play the visualize animation later, that would be a better approach since it would allow us to rewind back the sorting steps as well.

- Could be refractor to make it better

  - There are still a room for improvement such as BarSet components could be breakdown for a better Single Responsibility Principle.
  - This is also the same on arrayContext where it look like a god object now, the code is long and I should refractor some part of the function into another object such as Color Manager, Audio Manager.

- Could introduce Backend

  - I could introduce backend API to fetch the data from online world, maybe it’s a Bitcoin price, stock market price, and then sorting them, that would make the project even more interesting!

---

Thank you for reading to this far, I hope you enjoy it. If you have any question, please feel free to contact me via my email: nutdanai.kpjr@gmail.com
