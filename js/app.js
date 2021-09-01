// const url = `http://openlibrary.org/search.json?q=${searchText}`

// get data from Search Box 
const searchText = document.getElementById('inputValue')



// get data from api 
const loadData = () => {
    const url = `http://openlibrary.org/search.json?q=${searchText.value}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.docs))
}

// display book like search keyword
const displayData = data => {
    const searchResult = document.getElementById('searchResult')
    searchResult.innerText = data.numFound
    let num = 0
    data.forEach(element => {
        const books = document.getElementById('books')

        const coverPhoto = `https://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg`
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        
        <div class="card h-100">
            <img src="${coverPhoto}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <h5 class="card-title">${element.author_name}</h5>
              <h5 class="card-title">${element.first_publish_year}</h5>
              
            </div>
        </div>
        
        `
        books.appendChild(div)
        num++
        console.log(element.docs)
    })
    console.log(num)
}

