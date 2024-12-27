import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, CheckCircle } from 'lucide-react';

const AddressManager = ({ onAddressSelect, selectedAddress, formik, authState }) => {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Load addresses from localStorage on component mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem('userAddresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleAddAddress = (values) => {
    const newAddress = {
      id: Date.now(),
      ...values
    };
    
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    setShowAddForm(false);
    formik.resetForm();
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    formik.setValues(address);
    setShowAddForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    setAddresses(updatedAddresses);
    if (selectedAddress?.id === addressId) {
      onAddressSelect(null);
    }
  };

  const handleSelectAddress = (address) => {
    onAddressSelect(address);
    localStorage.setItem('address', JSON.stringify(address));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
        <button
          type="button"
          onClick={() => {
            setShowAddForm(true);
            setEditingAddress(null);
            formik.resetForm();
          }}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg cursor-pointer relative ${
              selectedAddress?.id === address.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelectAddress(address)}
          >
            {selectedAddress?.id === address.id && (
              <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary-500" />
            )}
            <div className="space-y-2">
              <div className="font-medium">
                {address.firstName} {address.lastName}
              </div>
              <div className="text-sm text-gray-600">
                {address.address}
                <br />
                {address.landmark && `${address.landmark}, `}
                {address.city}, {address.state} {address.pincode}
                <br />
                {address.country}
                <br />
                Phone: {address.phone}
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditAddress(address);
                  }}
                  className="text-gray-600 hover:text-primary-600 flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                  className="text-gray-600 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Address Form */}
      {showAddForm && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Your existing form fields here */}
            {/* Make sure to update the form submission to use handleAddAddress */}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => {
                if (formik.isValid) {
                  if (editingAddress) {
                    const updatedAddresses = addresses.map(addr =>
                      addr.id === editingAddress.id ? { ...formik.values, id: addr.id } : addr
                    );
                    setAddresses(updatedAddresses);
                  } else {
                    handleAddAddress(formik.values);
                  }
                  setShowAddForm(false);
                }
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {editingAddress ? 'Save Changes' : 'Save Address'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingAddress(null);
                formik.resetForm();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;