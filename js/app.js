// const url = `http://openlibrary.org/search.json?q=${searchText}`

// get data from Search Box 
const searchText = document.getElementById('inputValue')
const books = document.getElementById('books')
const error = document.getElementById('error')
const searchResult = document.getElementById('searchResult')
const showingResult = document.getElementById('showingResult')

// control spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle
}

// check undefined property in Api 
const checkUndefined = data => {
    if (data === undefined) {
        return "No Result Found"
    } else {
        return data
    }
}


// get data from api 
const loadData = () => {
    const url = `https://openlibrary.org/search.json?q=${searchText.value}`
    searchText.value = ''
    books.innerHTML = ''
    searchResult.innerText = ''
    showingResult.innerText = ' '
    error.style.display = 'none'
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))

    toggleSpinner('block')
}


// display book like search keyword
const displayData = data => {

    
// compare with triple equal 
    if (data.numFound === 0) {
        toggleSpinner('none')
        searchResult.innerText = 'No Result Found'
        error.style.display = 'block'
        error.innerText = 'Oops something went wrong. Please Enter a valid input'
    } else {
        searchResult.innerText = `${data.numFound} Result Found`
        let num = 0

        // use ForEach loop here 
        data.docs.forEach(element => {
            const coverPhoto = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`

            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `

                    <div class="card h-100">
                        <img src="${coverPhoto}" class="card-img-top" alt="">
                        <div class="card-body">
                        <h5 class="card-title">
                        <span class="fw-bolder fs-5">Book Name: </span>
                        <span class="fw-normal fs-5">${checkUndefined(element.title)}</span>
                        </h5>
                        <h6 class="card-title">
                        <span class="fw-bolder fs-6">Aouthor Name: </span>
                        <span class="fw-normal fs-6">${checkUndefined(element.author_name)}</span>
                        </h6>
                        <h6 class="card-title">
                        <span class="fw-bolder fs-6">Publisher Name: </span>
                        <span class="fw-normal fs-6">${checkUndefined(element.publisher[0])}</span>
                        </h6>
                        <h6 class="card-title">
                        
                        <span class="fw-bolder fs-6">First Published Year: </span>
                        <span class="fw-normal fs-6">${checkUndefined(element.first_publish_year)}</span></h6>
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
