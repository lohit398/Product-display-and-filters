import { LightningElement, wire, track, api } from 'lwc';
import GET_PRODUCTS from '@salesforce/apex/DE_GetProducts.getProducts';
import FILTER_PRODUCTS from '@salesforce/apex/DE_GetProducts.filterProducts';
import { NavigationMixin } from 'lightning/navigation';

export default class ProductDisplay extends NavigationMixin(LightningElement) {

    filterValues = {};
    allProducts = [];
    @track products = [];


    @wire(GET_PRODUCTS)
    getProducts({ error, data }) {
        if (error) {
            console.log(error)
        }
        else if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].Image_URL__c != undefined && data[i].Image_URL__c != null)
                    this.products.push(data[i]);
                this.allProducts.push(data[i]);
            }

        }
    }

    @api
    get filters() {
        return this.filterValues;
    }

    set filters(value) {
        if(value != '')
            this.filterValues = JSON.parse(value);

        /*console.log(this.filterValues.productFamilyFilters);
        console.log(this.filterValues.themaFilters);
        console.log(this.filterValues.Oplossingen_voor_filters);
        console.log(this.filterValues.Loca_tie_filters)*/

        if (this.filterValues.productFamilyFilters != undefined) {
            if (this.filterValues.productFamilyFilters.indexOf('All') === -1) {
                FILTER_PRODUCTS({ 
                    productFamilyFilters: this.filterValues.productFamilyFilters,
                    themaFilters: this.filterValues.themaFilters,
                    Oplossingen_voor_filters: this.filterValues.Oplossingen_voor_filters,
                    Loca_tie_filters: this.filterValues.Loca_tie_filters,
                    sortBy : this.filterValues.sortRecordsBy
                })
                    .then(response => {
                        this.products = [];
                        for (let i = 0; i < response.length; i++) {
                            if (response[i].Image_URL__c != undefined && response[i].Image_URL__c != null)
                                this.products.push(response[i]);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            else {
                this.products = JSON.parse(JSON.stringify(this.allProducts));
            }
        }
    }


    navigateNext(event) {
        //console.log(event.currentTarget.dataset.recordid);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.recordid,
                objectApiName: 'Product2',
                actionName: 'view'
            },
        });
    }
}