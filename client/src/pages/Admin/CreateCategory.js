import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); // initially empty array
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  // handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/category/create-category', { name });
      if (data?.success) {
        toast.success(`${name} created successfully`); // dynamic message
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in Input Form');
    }
  };

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');//directly destructure data in res.data
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    // for lifecycle
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {  //selected is state
        name: updatedName,
      });
      if (data.success) {
        toast.success(`${updatedName} updated successfully`);
        setSelected(null);
        setUpdatedName('');
        setOpen(false); // after submit, pop up model closes
        getAllCategory(); //so that at initial time we get all categories
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

    // delete category
    const handleDelete = async (pId) => {
        try {
          const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`, {
            name: updatedName,
          });
          if (data.success) {
            toast.success(`Category deleted successfully`);
            getAllCategory();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error('Something went wrong');
        }
      };

  return (
    <Layout title={'Dashboard - Create Category'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className='btn btn-primary ms-2'
                          onClick={() => {
                            setOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        {/* Model will pop up when clicked */}
                        <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c._id);}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}> 
            {/* to open a pop up when edit button is clicked */}
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
