import { gsap } from "./lib/index.js";
import SplitText from "./lib/SplitText.js";
import DrawSVGPlugin from "./lib/DrawSVGPlugin.js";
import ScrollTrigger from "./lib/ScrollTrigger.js";
import MorphSVGPlugin from "./lib/MorphSVGPlugin.js";
import CustomEase from "./lib/CustomEase.js";

window.gsap = gsap;

gsap.registerPlugin(
  SplitText,
  DrawSVGPlugin,
  ScrollTrigger,
  MorphSVGPlugin,
  CustomEase
);

class HomeAnimateDemo {
  constructor(block) {
    this.block = block;
    this.init();
  }

  init() {
    this.select = gsap.utils.selector(this.block);
    this.DOM = {
      trigger: this.select("#home-animate-trigger")[0],
      super: this.select(".home-animate__text-group--super")[0],
      choreograph: this.select(".home-animate__text-group--choreograph")[0],
    };

    this.triggerDefaults = {
      start: "left 70%",
      horizontal: true,
    };

    this.createTimelines();
  }

  basicWord(word) {
    gsap.from(word, {
      autoAlpha: 0,
      yPercent: 100,
      ease: "power2.out",
      duration: 0.6,
      scrollTrigger: {
        trigger: word,
        containerAnimation: this.scrollTween,
        start: "left 70%",
        horizontal: true,
      },
    });
  }

  basicWords() {
    const words = this.select(".home-animate__text-group > span:not([class])");
    words.forEach((word) => this.basicWord(word));
  }

  niceAndEasyEasing() {
    const nice = this.select(".home-animate__text-group--nice .home-animate__text--green-gradient");
    const easy = this.select(".home-animate__text-group--nice .home-animate__text--purple-gradient");
    const easing = this.select(".home-animate__text-group--nice .home-animate__text--orange-gradient");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: nice,
        ...this.triggerDefaults,
      },
    });

    tl.from([nice, easy], {
      autoAlpha: 0,
      rotateZ: -20,
      yPercent: -300,
      ease: "elastic.out(1, 0.75)",
      duration: 0.7,
      stagger: 0.3,
    });

    tl.from(
      easing,
      {
        autoAlpha: 0,
        rotateZ: 90,
        yPercent: -200,
        ease: "elastic.out(1, 0.75)",
        delay: 0.6,
        duration: 0.7,
      },
      "<"
    );
  }

  hand() {
    const hand = this.select(".home-animate__icon--hand");
    const handSvg = this.select(".home-animate__icon--hand svg");

    gsap.from(hand, {
      autoAlpha: 0,
      yPercent: 100,
      ease: "bounce.out",
      duration: 1,
      scrollTrigger: {
        trigger: hand,
        ...this.triggerDefaults,
      },
    });

    gsap.to(handSvg, {
      keyframes: [
        {
          scale: 1.2,
          rotateZ: "40deg",
          ease: "bounce.out",
          duration: 1,
        },
        {
          scale: 1,
          rotateZ: "0deg",
          ease: "bounce.out",
          delay: 2,
          duration: 1,
        },
      ],
      repeat: -1,
      repeatDelay: 2,
      scrollTrigger: {
        trigger: hand,
        ...this.triggerDefaults,
      },
    });
  }

  semicircle() {
    const circle = this.select(".home-animate__icon--circle");

    gsap.from(circle, {
      autoAlpha: 0,
      scale: 0.2,
      rotateZ: -450,
      yPercent: -100,
      ease: "power2.out",
      duration: 1,
      scrollTrigger: {
        trigger: circle,
        ...this.triggerDefaults,
      },
    });
  }

  personality() {
    const personality = this.select(".home-animate__personality");
    const personalitySplit = new SplitText(personality, { type: "chars" });

    gsap.from(personalitySplit.chars, {
      autoAlpha: 0,
      yPercent: () => gsap.utils.random([-150, 150]),
      duration: () => gsap.utils.random(1, 2),
      ease: "elastic.out(1, 0.75)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: personality,
        ...this.triggerDefaults,
      },
    });
  }

  huge() {
    const huge = this.select(".home-animate__huge");
    const hugeSpan = this.select(".home-animate__huge span");

    gsap.from(hugeSpan, {
      autoAlpha: 0,
      scale: 4,
      duration: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: huge,
        ...this.triggerDefaults,
      },
    });
  }

  superPlugAndPlay() {
    const superText = this.select(".home-animate__text-group--super .home-animate__text--green");
    const plugAndPlayText = this.select(".home-animate__text-group--super .home-animate__text--pink");
    const plugAndPlaySpan = this.select(".home-animate__text-group--super .home-animate__text--pink span span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.DOM.super,
        ...this.triggerDefaults,
      },
    });

    tl.from(superText, {
      autoAlpha: 0,
      rotateY: -25,
      rotateX: -85,
      ease: "back.out(1.4)",
      duration: 1.4,
    });

    tl.from(
      plugAndPlayText,
      {
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      0.6
    );

    tl.from(
      plugAndPlaySpan,
      {
        autoAlpha: 0,
        width: 0,
        scale: 0,
        ease: "power3.out",
        duration: 0.7,
        stagger: 0.5,
      },
      0.6
    );
  }

  asterisk() {
    const asterisk = this.select(".home-animate__icon--asterisk svg");

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.2,
      scrollTrigger: {
        trigger: asterisk,
        ...this.triggerDefaults,
      },
    });

    tl.to(asterisk, {
      rotate: "360deg",
      repeat: 2,
      duration: 2,
      ease: "circ.inOut",
    });
    tl.to(asterisk, {
      scale: 1.15,
      duration: 0.3,
      ease: "power3.inOut",
    });
    tl.to(asterisk, {
      scale: 1,
      duration: 0.3,
      ease: "power3.inOut",
    });
  }

  asteriskScrub() {
    const asterisk = this.select(".home-animate__icon--asterisk");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: asterisk,
        ...this.triggerDefaults,
        start: "center center",
        end: "+=600",
        scrub: 1,
      },
    });

    tl.to(asterisk, {
      xPercent: "500",
      ease: "none",
    });
  }

  customCurves() {
    const custom = this.select(".home-animate__custom");
    const customSplit = new SplitText(custom, { type: "chars" });
    const curves = this.select(".home-animate__curves");
    const curvesSplit = new SplitText(curves, { type: "chars" });

    const softCustom = CustomEase.create(
      "softCustom",
      "M0,0 C0,0.408 0.11,0.712 0.222,0.712 0.35,0.712 0.37,0.506 0.498,0.532 0.658,0.564 0.582,0.911 0.736,1.024 0.784,1.059 0.826,1.054 0.89,1.024 0.916,1.011 0.946,1 1,1 "
    );
    const elasticCustom = CustomEase.create(
      "elasticCustom",
      "M0,0 C0,0 0.014,0.136 0.021,0.226 0.04,0.48 0.046,0.612 0.065,0.867 0.072,0.966 0.075,1.017 0.085,1.115 0.091,1.186 0.096,1.224 0.106,1.293 0.109,1.314 0.112,1.327 0.118,1.346 0.121,1.356 0.125,1.364 0.13,1.371 0.131,1.372 0.135,1.373 0.136,1.372 0.139,1.371 0.143,1.366 0.145,1.362 0.152,1.346 0.157,1.334 0.161,1.316 0.185,1.207 0.194,1.143 0.218,1.03 0.225,0.995 0.23,0.975 0.24,0.941 0.245,0.922 0.25,0.91 0.258,0.892 0.261,0.886 0.264,0.882 0.268,0.877 0.271,0.874 0.273,0.87 0.277,0.869 0.281,0.868 0.288,0.868 0.292,0.869 0.298,0.872 0.303,0.876 0.307,0.882 0.336,0.928 0.353,0.965 0.383,1.012 0.389,1.022 0.396,1.028 0.405,1.035 0.412,1.04 0.419,1.043 0.428,1.046 0.433,1.047 0.437,1.046 0.443,1.045 0.448,1.044 0.453,1.043 0.458,1.041 0.486,1.025 0.503,1.012 0.531,0.996 0.539,0.992 0.545,0.99 0.554,0.987 0.562,0.985 0.568,0.984 0.576,0.983 0.587,0.983 0.595,0.983 0.606,0.985 0.702,1 0.712,1.035 0.77,1.034 0.82,1.032 0.838,1 1,1 "
    );

    gsap.from(customSplit.chars, {
      autoAlpha: 0,
      rotateX: 90,
      duration: 2.3,
      ease: elasticCustom,
      stagger: 0.175,
      scrollTrigger: {
        trigger: custom,
        ...this.triggerDefaults,
      },
    });

    gsap.from(curvesSplit.chars, {
      autoAlpha: 0,
      rotateX: 90,
      duration: 1.4,
      ease: softCustom,
      stagger: 0.175,
      scrollTrigger: {
        trigger: curves,
        ...this.triggerDefaults,
      },
    });
  }

  curvedLineToggle() {
    const trigger = this.select(".home-animate__icon--curve");
    const path = this.select("#home-animate__icon--curve-path");
    const toggleOne = this.select("#curved-line-toggle-one");
    const toggleTwo = this.select("#curved-line-toggle-two");

    const defaults = {
      duration: 2,
      ease: "power3.inOut",
    };

    const tl = gsap.timeline({
      defaults,
      scrollTrigger: {
        trigger,
        ...this.triggerDefaults,
        start: "center center",
        scrub: 1,
      },
    });

    tl.to(path, {
      morphSVG: "M188 33.0001C188 160 2.99953 161 2.99955 33.0001",
    });
    tl.to(
      trigger,
      {
        xPercent: "750",
        ease: "none",
      },
      "<"
    );
    tl.to(
      toggleOne,
      {
        xPercent: -7,
        yPercent: 120,
        rotate: -90,
        transformOrigin: "top right",
      },
      "<"
    );
    tl.to(
      toggleTwo,
      {
        xPercent: -4,
        yPercent: -586,
        rotate: 90,
        transformOrigin: "bottom left",
      },
      "<"
    );
  }

  animationSequences() {
    const animation = this.select(".home-animate__text-group--choreograph .home-animate__text--green");
    const sequences = this.select(".home-animate__text-group--choreograph .home-animate__text--orange");
    const key = this.select(".home-animate__text-group--choreograph .home-animate__icon--key");

    const defaults = {
      duration: 0.5,
      ease: "power3.inOut",
    };

    const tl = gsap.timeline({
      defaults,
      scrollTrigger: {
        trigger: this.DOM.choreograph,
        ...this.triggerDefaults,
      },
    });

    gsap.set(animation, {
      yPercent: -102.5,
      xPercent: -52.5,
    });

    gsap.set(sequences, {
      xPercent: -140,
    });

    gsap.set(key, {
      autoAlpha: 0,
      scale: 0.3,
    });

    tl.to(animation, {
      yPercent: 0,
    });

    tl.to(animation, {
      xPercent: 0,
    });

    tl.to(
      sequences,
      {
        keyframes: [
          {
            xPercent: -110,
            ...defaults,
          },
          {
            xPercent: 0,
            ...defaults,
          },
        ],
      },
      "-=.2"
    );

    tl.to(
      key,
      {
        autoAlpha: 1,
        scale: 1,
        ease: "back.out(2.7)",
      },
      "-=.2"
    );
  }

  snap() {
    const diamond = this.select(".home-animate__diamond");
    const snapWrap = this.select(".home-animate__snap");
    const snaps = this.select(".home-animate__snap span");

    const defaults = {
      duration: 0.6,
      ease: "elastic.out(1, 0.75)",
    };

    const tl = gsap.timeline({
      defaults,
      scrollTrigger: {
        trigger: diamond,
        ...this.triggerDefaults,
      },
    });

    tl.from(
      diamond,
      {
        autoAlpha: 0,
      },
      0
    );

    tl.to(
      diamond,
      {
        keyframes: [
          { rotationZ: 90, ...defaults },
          { rotationZ: 180, delay: 1, ...defaults },
          { rotationZ: 270, delay: 1, ...defaults },
          { rotationZ: 360, delay: 1, ...defaults },
        ],
        repeat: -1,
        repeatDelay: 1,
      },
      0
    );

    tl.fromTo(
      snapWrap,
      {
        autoAlpha: 0,
        rotationZ: -60,
      },
      {
        autoAlpha: 1,
        rotationZ: 0,
      },
      0
    );

    tl.fromTo(
      snaps[0],
      {
        autoAlpha: 0,
        rotationZ: -60,
      },
      {
        autoAlpha: 1,
        rotationZ: 0,
        repeat: -1,
        repeatDelay: 1,
      },
      1.6
    );

    tl.fromTo(
      snaps[1],
      {
        autoAlpha: 1,
        rotationZ: 0,
      },
      {
        autoAlpha: 0,
        duration: 0.4,
        rotationZ: 60,
        repeat: -1,
        repeatDelay: 1.2,
        ease: "power4.out",
      },
      1.6
    );
  }

  createTimelines() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(this.DOM.trigger, { autoAlpha: 1 });
      return;
    }

    gsap.set(this.DOM.trigger, { autoAlpha: 1 });

    const scrollTween = gsap.to(this.DOM.trigger, {
      x: () => -(this.DOM.trigger.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: this.DOM.trigger,
        start: "top top",
        pin: true,
        scrub: 1,
        end: "+=3000px",
        invalidateOnRefresh: true,
        pinSpacing: "padding",
      },
    });

    this.scrollTween = scrollTween;
    this.triggerDefaults.containerAnimation = this.scrollTween;

    this.basicWords();
    this.niceAndEasyEasing();
    this.hand();
    this.semicircle();
    this.personality();
    this.huge();
    this.superPlugAndPlay();
    this.asterisk();
    this.asteriskScrub();
    this.curvedLineToggle();
    this.customCurves();
    this.animationSequences();
    this.snap();
  }
}

const root = document.querySelector("#home-animate");
if (root) {
  new HomeAnimateDemo(root);
}

window.addEventListener("load", () => {
  if (ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});
