import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage})  => {

    // Komponentin tilan määritys
const [products, setProducts] = useState([])
const [showProducts, setShowProducts] = useState(false)
const [lisäystila, setLisäystila] = useState(false)
const [muokkausstila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")


useEffect(() => {
    ProductService.getAll()
    .then(data => {
        setProducts(data)
    })
},[lisäystila, reload, muokkausstila]
)

//Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setShowProducts(true)
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkaustila(true)
}

  return (
    <>
        <h2><nobr style={{ cursor: 'pointer' }}
                onClick={() => setShowProducts(!showProducts)}>Products</nobr>

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h2>

                {!lisäystila && !muokkausstila &&
                <input placeholder="Search by product name" value={search} onChange={handleSearchInputChange} />
                }

                {lisäystila && <ProductAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />}

                {muokkausstila && <ProductEdit setMuokkaustila={setMuokkaustila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaProduct={muokattavaProduct}
                />}


        {
            !lisäystila && !muokkausstila && showProducts && products && products.map(p => 
                {
                    const lowerCaseName = p.productName.toLowerCase()
                if (lowerCaseName.indexOf(search) > -1) {
                    return (
                        <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        editProduct={editProduct} />
                    )
                }
                }
            )
        }
    </>
  )
}

export default ProductList