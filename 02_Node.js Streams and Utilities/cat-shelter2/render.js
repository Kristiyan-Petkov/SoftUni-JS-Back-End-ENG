const fs = require('fs/promises');
async function renderHome(search) {
    let homePageHtml = await fs.readFile('./views/home.html', 'utf-8');
        let catsResult = await fs.readFile('./cats.json', 'utf-8');
        let cats = JSON.parse(catsResult);

        const catsPageResult = cats
            .filter(x => search 
                ? x.name.toLowerCase().startsWith(search.toLocaleLowerCase()) 
                : true)
            .map(x => catTemplate(x)).join('');
        homePageResult = homePageHtml.replace('{{cats}}', catsPageResult);
    
    return homePageResult;
}

const catTemplate = (cat) => `<li>
                        <img src="${cat.imageUrl}" alt="Black Cat">
                        <h3>${cat.name}</h3>
                        <p><span>Price: </span>${cat.price}$</p>
                        <p><span>Breed: </span>${cat.breed}</p>
                        <p><span>Description: </span>${cat.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="">Change Info</a></li>
                            <li class="btn delete"><a href="">New Home</a></li>
                        </ul>
                    </li>`

exports.renderHome = renderHome;