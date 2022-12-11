import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createProducts } from '../api/productsApi';


export default function ProductForm() {

  const queryClient= useQueryClient()

  const successAddProduct=()=>{
    console.log('product added successfully')
    queryClient.invalidateQueries('products')
  }

  const addProductMutation= useMutation({
    mutationFn: createProducts,
    onSuccess: successAddProduct
  })

  const handlerSubmit= (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const product= Object.fromEntries(formData)
    console.log(Object.fromEntries(formData))
    addProductMutation.mutate({
      ...product,
      inStock: true
    })
  }

  return (
    <Form onSubmit={handlerSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='name' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" name='description' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Price" name='price' />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="In Stock" />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}