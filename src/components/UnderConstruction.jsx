const UnderConstruction = () => {
  const images = [
    "https://www.pngall.com/wp-content/uploads/2018/04/Under-Construction-PNG-File-Download-Free.png",
    "https://www.pngkey.com/png/full/397-3975496_under-construction-png-website-under-construction-icon.png",
    "https://media.tenor.com/9n1CXysOWEAAAAAj/ethosaur-nonagon.gif",
    "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8688491/hiE5vMs.gif?quality=90&strip=all&crop=0,0,100,100",
    "https://media1.tenor.com/m/rV2ZKVZAMlwAAAAC/cat-colon-three.gif",
    "https://media1.tenor.com/m/huBBmHvsqD0AAAAd/dripped-cock.gif"

  ]
  const animations = [
    "animate-bounce",
    "animate-spin",
  ]

  return (
    <a href="/seafood-chat/feed">
      <img className={`${animations[Math.floor(Math.random() * animations.length)]} w-full mt-24`}
           // select random image
           src={images[Math.floor(Math.random() * images.length)]}
           alt=""
      />
    </a>
  );
};

export default UnderConstruction;