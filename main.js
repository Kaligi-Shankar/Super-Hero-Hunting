let fav_array = [];
let fav_id = [];
let hero_details = "";

//-----------------Fetching SuperHero API-------------------------//

document.getElementById("search_bar").onkeyup = async function () {
  await fetch(
    `https://superheroapi.com/api.php/5293556184027867/search/${
      document.getElementById("search_bar").value
    }`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (document.getElementById("search_bar").value) {
        document.getElementById("search_results").innerHTML = "";
        document.getElementById("search_results").className = "search_results";
        let results = data.results;
        results.map((res) => {
          var main_div = document.createElement("div");
          var p = document.createElement("p");
          p.innerHTML = res.name;
          p.onclick = function () {
            // redirect(res.id);
            fetch(`https://superheroapi.com/api.php/5293556184027867/${res.id}`)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                hero_details = data;
                details_redirect();
              })
              .catch(function (err) {
                // There was an error
                console.warn("Something went wrong.", err);
              });
          };
          p.setAttribute("class", "res_name");
          var p_btn = document.createElement("p");
          p_btn.innerHTML = `<i class="fa fa-star-o"></i>`;
          p_btn.setAttribute("class", "res_fav");
          p_btn.onclick = function () {
            let fav_obj = {
              id: res.id,
              name: res.name,
            };

            if (fav_id.includes(res.id)) {
              alert(`${fav_obj.name} was already added to favroities`);
            } else {
              fav_array.push(fav_obj);
              fav_id.push(res.id);
              alert(`${fav_obj.name} successfully added to favroities`);
              window.localStorage.setItem(
                "favorites",
                JSON.stringify(fav_array)
              );
            }
          };
          main_div.appendChild(p);
          main_div.appendChild(p_btn);
          main_div.setAttribute("class", "res_div");
          var div = document.getElementById("search_results");
          div.appendChild(main_div);
        });
      } else {
        document.getElementById("search_results").className = "hide_search_res";
      }
    });
};


//----------------------Home page & Super Hero Page-----------------------//
function details_redirect() {
  document.getElementById("search_page").className = "hide_search_page";
  document.getElementById("details_page").className = "details_page";
  console.log(hero_details);
  document.getElementById("profile_img").src = hero_details.image.url;
  document.getElementById("hero_name").innerHTML = hero_details.name;
  document.getElementById(
    "hero_gender"
  ).innerHTML = `Gender:${hero_details.appearance.gender}`;
  document.getElementById(
    "hero_height"
  ).innerHTML = `Height: ${hero_details.appearance.height[1]}`;
  document.getElementById(
    "hero_weight"
  ).innerHTML = `Weight: ${hero_details.appearance.weight[1]}`;
  document.getElementById(
    "hero_intelligence"
  ).style.width = `${hero_details.powerstats.intelligence}%`;
  document.getElementById(
    "hero_strength"
  ).style.width = `${hero_details.powerstats.strength}%`;
  document.getElementById(
    "hero_speed"
  ).style.width = `${hero_details.powerstats.speed}%`;
  document.getElementById(
    "hero_durability"
  ).style.width = `${hero_details.powerstats.durability}%`;
  document.getElementById(
    "hero_power"
  ).style.width = `${hero_details.powerstats.power}%`;
  document.getElementById(
    "hero_combat"
  ).style.width = `${hero_details.powerstats.combat}%`;
  document.getElementById(
    "hero_fullname"
  ).innerHTML = `Full Name: ${hero_details.biography["full-name"]}`;
  document.getElementById(
    "hero_aliases"
  ).innerHTML = `Aliases: ${hero_details.biography.aliases}`;
  document.getElementById(
    "hero_place_of_birth"
  ).innerHTML = `Place of Birth: ${hero_details.biography["place-of-birth"]}`;
  document.getElementById(
    "hero_firstappearance"
  ).innerHTML = `First Appearance: ${hero_details.biography["first-appearance"]}`;
  document.getElementById(
    "hero_publisher"
  ).innerHTML = `Publisher: ${hero_details.biography.publisher}`;
  document.getElementById(
    "hero_alignment"
  ).innerHTML = `Alignment: ${hero_details.biography.alignment}`;
}
