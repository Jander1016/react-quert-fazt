import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import {deleteProduct, getProducts, updateProduct} from "../api/productsApi"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Products = () => {

  const queryClient = useQueryClient()

  const {isLoading, data: products, isError, error} = useQuery({
    queryKey: ['products'], 
    queryFn: getProducts, 
    select: products=> products.sort((a,b)=> b.id - a.id)
  })

  const successProduct=(mensaje)=>{
    console.log(`product ${mensaje} successfully`)
    queryClient.invalidateQueries('products')
  }

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: successProduct('Delete')
  })
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: successProduct('Update')
  })

  if (isLoading) return <div>Loading...</div>
  else if (isError) return <div>Error: {error.message}</div>

  return products.map(product =>(
      <div className='row'>
        <article className='col col-sl-3 col-ml-2'>
          <Card style={{ width: '16rem' }} key= {product.id}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
              {product.description}
              </Card.Text>
              <Card.Text>
              {product.price}
              </Card.Text>
              <Card.Text>
                <input 
                  type="checkbox"
                  checked={product.inStock}
                  id={product.id}
                  onChange={(e)=>updateProductMutation.mutate({
                    ...product,
                    inStock: e.target.checked
                  })}
                />
                <label htmlFor={product.id}> In Stock</label>
              </Card.Text>
              <Button variant="primary" onClick={()=>deleteProductMutation.mutate(product.id)}>Delete</Button>
              </Card.Body>
          </Card>
        </article>
      </div>
  ))
}

export default Products
