<template>
    <div class="col mb-5">
              <div class="card h-100">
                <!-- Product image-->
                <img
                  class="card-img-top"
                  src="@/assets/img/aptImage1.jpg"
                  alt="..."
                />
                <!-- Product details-->
                <div class="card-body p-4">
                  <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">{{property.apartmentName}}</h5>
                    <h6>분류 : {{property.type}}</h6>                    
                    <h6>보증금 : {{property.dealAmount}}</h6>
                    <h6 v-if="property.dealAmount != 0">월세 : {{property.dealAmount}}</h6>
                    <h6>전용면적 : {{property.area}} m<sup>2</sup></h6>
                    <h6>층 수 : {{property.floor}}</h6>
                  </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <button class="btn btn-outline-dark mt-auto" @click="deleteItem">삭제</button>
                  </div>
                </div>
              </div>
            </div>
</template>

<script>
import {deleteProperty} from '@/api/property.js';

export default {
    name: 'PropertyListItem',
    components: {},
    props:{
        property: Object,
    },
    data() {
        return {
            
        };
    },
    created() {

    },
    methods: {
        async deleteItem(){
          await deleteProperty(this.property.no);
          this.$emit('update_property');
        }
    },
};
</script>

<style scoped></style>