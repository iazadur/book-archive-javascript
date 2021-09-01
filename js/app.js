// const url = `http://openlibrary.org/search.json?q=${searchText}`

// get data from Search Box 
const searchText = document.getElementById('inputValue')
const books = document.getElementById('books')
const error = document.getElementById('error')
const searchResult = document.getElementById('searchResult')
const showingResult = document.getElementById('showingResult')


// get data from api 
const loadData = () => {
    const url = `http://openlibrary.org/search.json?q=${searchText.value}`
    searchText.value = ''
    error.style.display = 'none'
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))

    toggleSpinner('block')
}


// display book like search keyword
const displayData = data => {



    searchResult.innerText = `Search Result: ${data.numFound}`

    if (data.numFound === 0) {
        toggleSpinner('none')
        error.style.display = 'block'
        error.innerText = 'Oops something went wrong. Please Enter a valid input'
    } else {
        let num = 0
        data.docs.forEach(element => {
            const coverPhoto = `https://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg`

            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `

                    <div class="card h-100">
                        <img src="${coverPhoto}" class="card-img-top" alt="">
                        <div class="card-body">
                        <h5 class="card-title">Book Name: ${element.title}</h5>
                        <h6 class="card-title">Aouthor Name: ${element.author_name}</h6>
                        <h6 class="card-title">First Published Date: ${element.first_publish_year}</h6> 
                        </div>
                    </div>
        
        `
            books.appendChild(div)
            toggleSpinner('none')
            num += 1
        })
        showingResult.innerText = `Showing Result: ${num}`
    }

}

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle
}