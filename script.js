async function getArts(page_id){
  const data1 = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page_id}&limit=10
`,{
    method:"GET"
  }
);
  const doc = document.createElement("div");
  doc.className = "title";
  const arts = await data1.json();
  const items = arts.data.length;
  doc.innerHTML="ART Collection"
  for(i=0;i<items;i++){
    const content = document.createElement("div");
    content.className = "art";
    const art_name = arts.data[i].title;
    const art_id = arts.data[i].id;
    const date = arts.data[i].date_display;
    const artist = arts.data[i].artist_display;
    const image = await fetch(`https://www.artic.edu/iiif/2/${arts.data[i].image_id}/full/843,/0/default.jpg}`);
    // console.log(art_name);
    var img = document.createElement("img");
    img.className= "image";
    img.setAttribute("src",`https://www.artic.edu/iiif/2/${arts.data[i].image_id}/full/843,/0/default.jpg`);
    content.innerHTML=`${art_name} <br>
    id:${art_id}<br>
    Dated:${date}<br>
    Artist:${artist}<br>
    `;
    content.append(img);
    doc.append(content);
  }
  document.body.append(doc);
}

async function getPage(){
  const pagination = document.querySelector(".pagination");       
  for(let i=1;i<=10;i++){
    const page=document.createElement("button");
    page.className="buttons";
    page.innerText = i;
    page.onclick = function () {
     document.querySelector(".title").remove();
      getArts(i);
    }
    pagination.append(page);
    
  }
  getArts(1);
}
getPage();
