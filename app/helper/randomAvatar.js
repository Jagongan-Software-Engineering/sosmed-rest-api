exports.getAvatar = () => {
  const eyes = [
    "eyes1",
    "eyes2",
    "eyes3",
    "eyes4",
    "eyes5",
    "eyes6",
    "eyes7",
    "eyes9",
  ];
  const nose = [
    "nose2",
    "nose3",
    "nose4",
    "nose5",
    "nose6",
    "nose7",
    "nose8",
    "nose9",
  ];
  const mouth = [
    "mouth1",
    "mouth10",
    "mouth11",
    "mouth3",
    "mouth5",
    "mouth6",
    "mouth7",
    "mouth9",
  ];
  const color = [
    "bb22d7",
    "9d2442",
    "b1d207",
    "61d03e",
    "7186ec",
    "8f49dc",
    "41489e",
    "05df73",
  ];
  return `https://api.adorable.io/avatars/face/${eyes[getRandomNumber()]}/${
    nose[getRandomNumber()]
  }/${mouth[getRandomNumber()]}/${color[getRandomNumber()]}`;
};

getRandomNumber = () => {
  return Math.floor(Math.random() * 8 + 0);
};
