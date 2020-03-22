// GLOBAL VARIABLES
let body = document.getElementById("body")
let container = document.getElementById("main-container")
let darkModeBtn = document.getElementById("mode-btn")
let navbar = document.getElementById("top-navbar")
let navbarBrand = document.getElementById("brand")
let flagContainer = document.getElementById("flag-container")

let searchForm = document.getElementById("search-form")
let searchInput = document.getElementById("search-input")
let filterMenu = document.getElementById("filter")
let filterBtn = document.getElementById("btn-dropdownMenu")
let dropDownMenu = document.getElementById("dropdown-menu")
let dropDownMenuItems = document.getElementsByClassName("dropdown-item")
let gridContainer = document.getElementById("grid-container")

let countryThumb = document.getElementsByClassName("country-thumbnail")

let submitBtn = document.getElementById("submit-btn")
let backBtn = document.getElementById("btn-return")
let borderList = document.getElementById("country-detail-border-list")

searchInput && searchInput.addEventListener("keyup", function () {
    let inputValue = searchInput.value.toUpperCase()

    for (let i = 0; i < countryThumb.length; i++) {
        let countries = countriesList[i].name.toUpperCase()

        if (countries.indexOf(inputValue) > -1) {
            countryThumb[i].style.display = ""

        } else {
            countryThumb[i].style.display = "none"
        }
    }
})



let mode = localStorage.getItem("darkMode")
let darMode = ""


darkModeBtn.onclick = () => {
    darkModeStatus()
    darkModeStyle()
}


function darkModeStatus() {
    darkMode = !darkMode
    localStorage.setItem("darkMode", darkMode)
}


async function darkModeStyle() {
    darkModeBtn.classList.toggle("dark-soft-on")
    body.classList.toggle("dark-on")
    container.classList.toggle("dark-on")
    navbarBrand.classList.toggle("dark-soft-on")
    navbar.classList.toggle("bg-light")
    navbar.classList.toggle("dark-on")
    navbar.classList.toggle("dark-soft-on")

    if (searchInput != null) {
        searchInput.classList.toggle("dark-soft-on")
        filterMenu.classList.toggle("dark-soft-on")
        filterBtn.classList.toggle("dark-soft-on")
        dropDownMenu.classList.toggle("dark-soft-on")

        await initial
        // console.log(countryThumb.length)

        for (let i = 0; i < countryThumb.length; i++) {
            countryThumb[i].classList.toggle("dark-soft-on")
        }
    }

    if (borderList !== null) {
        borderList.classList.toggle("dark-soft-on")
    }
}



let countriesList = []
// Using FETCH API --> async function
const API = function () {
    fetch("https://restcountries.eu/rest/v2/all")
        .then((res) => {
            return res.json()
        })
        .then(async (data) => { // Converte o Response Body em JSON format       
            countriesList = data
            initial(data, countriesLoaded)

            if (mode === "true") {
                darkMode = true
                darkModeStyle()
                console.log(mode)

            } else if (mode !== "true") {
                darkMode = false
            }

        })
        .catch((err) => {
            console.log("There seems do be an Error: " + err)
        })
}

API()


searchForm && (searchForm.onsubmit = function (e) {
    e.preventDefault()

    let input = searchInput.value
    let inputFirstCharUpperCase = inputUpperCase(input)
    let resultSearch = mysearch(inputFirstCharUpperCase)

    if (!input) {
        console.log("There's no input!")
        searchInput.style.border = "3px solid red"
        setTimeout(function () {
            searchInput.style.border = ""
        }, 1200)
    }

    if (resultSearch) {
        localStorage.setItem("countryDetail", JSON.stringify(resultSearch))
        window.document.location = "./country_detail.html"
    }
})


const country = JSON.parse(localStorage.getItem("countryDetail"))


// Function to UpperCase the First Character on the Search Form
function inputUpperCase(inputValue) {
    return inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
}

// Function to search on the CountriesList Array
function mysearch(country) {
    for (var i = 0; i < countriesList.length; i++) {
        if (countriesList[i].name == country) {
            var result = countriesList[i]
            return result
        }
    }

    return false
}

// Fuction to load on the coutry_detail page
function getDetail() {
    let detailCountryImage = document.getElementById("country-detail-img")
    let detailCountryName = document.getElementById("country-detail-name")
    let detailNativeName = document.getElementById("country-native-name")
    let detailCountryPopulation = document.getElementById("country-detail-population")
    let detailCountryRegion = document.getElementById("country-detail-region")
    let detailCountrySubRegion = document.getElementById("country-detail-sub-region")
    let detailCountryCapital = document.getElementById("country-detail-capital")

    let detailCountryDomain = document.getElementById("country-detail-domain")
    let detailCountryCurrencies = document.getElementById("country-detail-currency")
    let detailCountryLanguages = document.getElementById("country-detail-languages")

    let detailCountryBorder = document.getElementById("country-detail-border-list")

    detailCountryImage.innerHTML = `<img class="image-detail" src=${country.flag}>`
    detailCountryName.innerHTML = country.name
    detailNativeName.innerHTML = country.nativeName
    detailCountryPopulation.innerHTML = country.population.toLocaleString("en")
    detailCountryRegion.innerHTML = country.region
    detailCountrySubRegion.innerHTML = country.subregion
    detailCountryCapital.innerHTML = country.capital

    detailCountryDomain.innerHTML = country.topLevelDomain[0]
    detailCountryCurrencies.innerHTML = country.currencies[0].code

    for (let i = 0; i < country.languages.length; i++) {
        detailCountryLanguages.innerHTML += `${country.languages[i].name}, `
    }

    for (let i = 0; i < country.borders.length; i++) {
        detailCountryBorder.innerHTML += `${country.borders[i]}, `
    }

    backBtn.addEventListener("click", function () {
        localStorage.removeItem("countryDetail")
    })
}


// FILTER by REGION
let filteredRegion = ""

for (let i = 0; i < dropDownMenuItems.length; i++) {
    dropDownMenuItems[i].addEventListener("click", function (e) {
        filteredRegion = e.target.textContent
        filter()
    })
}


function filter() {
    if (filteredRegion) {
        for (let i = 0; i < countryThumb.length; i++) {
            if (countriesList[i].region == filteredRegion) {
                countryThumb[i].style.display = ""

            } else {
                countryThumb[i].style.display = "none"
            }
        }
    }
}
// END of FILTER by REGION


// INITIAL LAYOUT
let getIndex = ""

// Fuction using data retrived -> for Home Page / Initial Layout
const initial = function (countriesData, callback) {
    for (let i = 0; i < countriesData.length; i++) {

        // Child Element --> Country Thumbnail --> Appended to Parent Element --> Grid Container
        let newCountryThumbnail = document.createElement("div")
        newCountryThumbnail.id = "thumb-1"
        newCountryThumbnail.classList.add("country-thumbnail")

        // Child Elements --> Appended to Parent Element --> Country Thumbnail
        let newCountryThumbnailImage = document.createElement("div")
        newCountryThumbnailImage.id = "img-1"
        newCountryThumbnailImage.classList.add("country-img")
        newCountryThumbnailImage.innerHTML = `<img class="thumb-img" src=${countriesData[i].flag}>`

        let newCountryThumbnailDetails = document.createElement("div")
        newCountryThumbnailDetails.classList.add("country-details")
        newCountryThumbnailDetails.innerHTML =
            `<h5 id="country-1-name" class="country-name">${countriesData[i].name}</h5>
            <p class="detail-title">Population: <span id="country-1-population" class="country-specs">${countriesData[i].population.toLocaleString("en")}</span></p>
            <p class="detail-title">Region: <span id="country-1-region" class="country-specs">${countriesData[i].region}</span></p>
            <p class="detail-title">Capital: <span id="country-1-capital" class="country-specs">${countriesData[i].capital}</span></p>`

        if (gridContainer !== null) {
            gridContainer.appendChild(newCountryThumbnail)
            newCountryThumbnail.appendChild(newCountryThumbnailImage)
            newCountryThumbnail.appendChild(newCountryThumbnailDetails)
        }

        if (newCountryThumbnail !== null) {
            newCountryThumbnail.setAttribute("index", countriesData.indexOf(countriesData[i]))
        }
    }

    callback()
}


// Funtion to Add Event Listener --> Click on the initial Countries Elements
function countriesLoaded() {
    for (let i = 0; i < countryThumb.length; i++) {
        countryThumb[i].addEventListener("click", function () {
            getIndex = parseInt(countryThumb[i].getAttribute("index"))
            localStorage.setItem("countryDetail", JSON.stringify(countriesList[getIndex]))
            window.document.location = "./country_detail.html"
        })
    }
}