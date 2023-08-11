const apikey = "82b8f65436db8eaf758395b926315ce1";
const url = "https://gnews.io/api/v4/search?q=";
window.addEventListener('load',()=> fetchNews("India"));

function reload(){
    window.location.reload();
}
 

 async function fetchNews(query) {
    const res = await fetch(`${url}${query}&lang=en&country=in&apikey=${apikey}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
} 

function bindData(articles){
    const cardsConatainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsConatainer.innerHTML=' ';

    articles.forEach(article => {
        if(!article.image) return;
        const cardClone  = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardsConatainer.appendChild(cardClone);
    });
}

function fillData(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src=article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;  
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',() =>{
        window.open(article.url,"_blank");
    })
}


function onNavItemClick(id){
    fetchNews(id);
}

const searchbutton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchbutton.addEventListener('click', ()=>{
   const query = searchText.value;
   if(!query) return;
   fetchNews(query);

})