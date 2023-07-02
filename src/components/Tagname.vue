<template>
    <div>
      <span class="ml-3">{{ tag_name.text }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TagnameItem', 
      props: {
          tag_name: {
              type: Object,
              required: true
          }
      }
  }
  </script>
  
  <style>
  
  </style>
  // eslint-disable-next-line