# Load It Lazy (Lazy Load Images - Code from Scratch)

This demo project uses **Web Components** and **Intersection Observer** to detect if the image came in the viewport or not. It then lazy loads the image.

## Usage

First install imagemagick on your machine. For debian/ubuntu users :

```bash
sudo apt install imagemagick
```

*Note: Without imagemagick on your system, this project will not work.*

Then clone this repo and follow the below commands :

Install the dependencies : 
```bash
npm i
```

Run the dev server locally :
```bash
npm run dev
```

Start the project (no dev server) locally :
```bash
npm run start
```

For seeing the effect of lazy loading (which loads a low res image before original image), throttle your network to fast 3G or less in Browser Dev tools. And then reload the page.

## Credits :

This demo project was mainly possible from the Youtube video of Chrome Polymer Summit 2017 : 

[Supercharged Live Live Live!](https://youtu.be/tHJwRWrexqg)

