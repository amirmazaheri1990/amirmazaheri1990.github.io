---
title: "Visual Text Correction"
summary: "A vision-and-language task for automatically detecting and correcting falsified words in video descriptions."
period: "2017 – 2018"
tags: ["vision-and-language", "video", "text-correction"]
featured: true
order: 7
links:
  site: "https://amirmazaheri1990.github.io/VTC/"
  video: "https://www.youtube.com/watch?v=4-euj_8TUCg"
publications:
  - title: "Visual Text Correction"
    authors: ["Amir Mazaheri", "Mubarak Shah"]
    venue: "ECCV"
    year: 2018
    links:
      pdf: "http://crcv.ucf.edu/papers/eccv2018/vtc.pdf"
      project: "https://amirmazaheri1990.github.io/VTC/"
      video: "https://www.youtube.com/watch?v=4-euj_8TUCg"
      slides: "https://drive.google.com/file/d/1kiaR6K7lbZGdLkndEGPL-9cs1aCzJT2b/view?usp=sharing"
---

Introduces the Visual Text Correction (VTC) task: given a short video clip and a caption, detect the incorrect word and replace it with the correct one. We built a dataset on top of LSMDC by automatically falsifying captions, then trained a model that jointly localizes the error and proposes a correction using video–text semantics.
