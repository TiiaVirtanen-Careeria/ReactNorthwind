import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Product'

// props on nimeltään product
const Product = ({product, editProduct, setIsPositive, setMessage, setShowMessage, reload, reloadNow})  => {

    // Komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove Product ${product.productName}`)

    if (vastaus === true) {
    ProductService.remove(product.productId)
    .then(res => {
        if (res.status === 200) {
        setMessage(`Successfully removed product ${product.productName}`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
        reloadNow(!reload)
        }
        
            }
        )
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

    } // Jos poisto halutaankin perua
    else {
    setMessage('Poisto peruttu onnistuneesti.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
    }
}

  return (
    <div className='customerDiv'>
        <h4><nobr style={{ cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>{product.productName}</nobr></h4>

        {showDetails && <div className="customerDetails">
            <h4>{product.productName}</h4>
            <button className='nappi2' onClick={() => editProduct(product)}>Edit</button>
            <button className='nappi2' onClick={() => deleteProduct(product)}>Delete</button>
                <table>
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Category Id</th>
                            <th>Quantity per Unit</th>
                            <th>Unit Price</th>
                            <th>Units in Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.productName}</td>
                            <td>{product.categoryId}</td>
                            <td>{product.quantityPerUnit}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.unitsInStock}</td>
                        </tr>
                    </tbody>
                </table></div>}
    </div>
  )
}

export default Product