import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

const [newProductId, setNewProductId] = useState('')
const [newProductName, setNewProductName] = useState('')

const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
const [newUnitPrice, setNewUnitPrice] = useState('')
const [newUnitsInStock, setNewUnitsInStock] = useState('')

const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(0)
const [newReorderLevel, setNewReorderLevel] = useState(0)
const [newDiscontinued, setNewDiscontinued] = useState(false)


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newProduct = {
        productId: newProductId,
        productName: newProductName,
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: newUnitPrice,
        unitInStock: newUnitsInStock,
        unitsOnOrder: newUnitsOnOrder,
        reorderLevel: newReorderLevel,
        discontinued: newDiscontinued
    }

    ProductService.create(newProduct)
    .then(response => {
      if (response.status === 200) {
       setMessage("Added new Product: " + newProduct.productName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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
    <div id="addNew">
       <h2>Product add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newProductName} placeholder="Product name"
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newQuantityPerUnit} placeholder="Quantity per Unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <input type="text" value={newUnitPrice} placeholder="Unit Price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <input type="text" value={newUnitsInStock} placeholder="Unit in Stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>

            <div>
                <input type="text" value={newUnitsOnOrder} placeholder="Unit on Order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>

            <div>
                <input type="text" value={newReorderLevel} placeholder="Reorder level"
                    onChange={({ target }) => setNewReorderLevel(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default ProductAdd