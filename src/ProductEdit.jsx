import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct}) => {

// Komponentin tilan määritys

const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)

const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitInStock)



// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newProduct = {
        productId: newProductId,
        productName: newProductName,
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newUnitPrice,
        unitInStock: newUnitsInStock
    }
    
    ProductService.update(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited Product: " + newProduct.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }


  return (
    <div id="edit">
       <h2>Product Edit</h2>

       <form onSubmit={handleSubmit}>
       <div>
                <input type="text" value={newProductId} disabled />
            </div>
            <div>
                <label>Product name: </label>
                <input type="text" value={newProductName}
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
              <label>Quantity per Unit: </label>
                <input type="text" value={newQuantityPerUnit}
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <label>Unit Price: </label>
                <input type="text" value={newUnitPrice}
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <label>Unit in Stock: </label>
                <input type="text" value={newUnitsInStock}
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default ProductEdit