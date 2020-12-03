import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import FAMILY from '@salesforce/schema/Product2.Family';

export default class ProductCatalogContainer extends LightningElement {
    options = [{ label: 'Overheden', value: 'Overheden' },
    { label: 'Bedrijven', value: 'Bedrijven' },
    { label: 'Aannemers', value: 'Aannemers' },
    { label: 'Particulieren', value: 'Particulieren' }];

    options1 = [{ label: 'Bebouwing', value: 'Bebouwing' },
    { label: 'Bedrijvengebied', value: 'Bedrijvengebied' },
    { label: 'Bodem', value: 'Bodem' },
    { label: 'Natuur', value: 'Natuur' },
    { label: "Publieke ruimte", value: "Publieke ruimte " },
    { label: "Water", value: "Water " },
    { label: 'Wegen', value: 'Wegen' }];

    options2 = [{ label: 'Aanleg & realisatie', value: 'Aanleg & realisatie' },
    { label: 'Doorstroming', value: 'Doorstroming' },
    { label: 'Droge voeten', value: 'Droge voeten' },
    { label: 'Duurzaamheid', value: 'Duurzaamheid' },
    { label: 'Energie', value: 'Energie' },
    { label: 'Onderhoud', value: 'Onderhoud' },
    { label: 'Overlast reductie', value: 'Overlast reductie' },
    { label: 'Veiligheid', value: 'Veiligheid' }];

    value = [""];

    sortRecordsBy = [];

    productFamily = ["All"];
    productFamilies;
    productFamilyFilters = [];
    themaFilters = [];
    Loca_tie_filters = [];
    Oplossingen_voor_filters = [];
    filters = {};
    filterString = '';
    sortBy = [{ label: 'Product Family', value: 'Family' },
    { label: 'Product Name', value: 'Name' }];
    sortedBy = ['Family','Name'];


    @wire(getPicklistValues, { recordTypeId: '01209000001A021AAC', fieldApiName: FAMILY })
    getPicklistDetails({ error, data }) {
        if (data) {
            this.productFamilies = JSON.parse(JSON.stringify(data.values));
            this.productFamilies.unshift({ label: 'All', value: 'All' });
        }
        if (error) {
            console.log(error);
        }
    }
    handleFilterChange(event) {
        if (event.target.dataset.filtername === 'Family') {
            this.productFamilyFilters = event.detail.value;
            this.filters.productFamilyFilters = this.productFamilyFilters;
        }
        else if (event.target.dataset.filtername === 'Thema') {
            this.themaFilters = event.detail.value;
            this.filters.themaFilters = this.themaFilters;
        }
        else if (event.target.dataset.filtername === 'Oplossingen_voor') {
            this.Oplossingen_voor_filters = event.detail.value;
            this.filters.Oplossingen_voor_filters = this.Oplossingen_voor_filters;
        }
        else if (event.target.dataset.filtername === 'Loca_tie') {
            this.Loca_tie_filters = event.detail.value;
            this.filters.Loca_tie_filters = this.Loca_tie_filters;
        }
        else if(event.target.dataset.filtername === 'sort'){
            this.sortRecordsBy = event.detail.value;
        }
        this.filters.sortRecordsBy = this.sortRecordsBy;
        console.log(this.filters.sortRecordsBy);
        this.filterString = JSON.stringify(this.filters);
    }
}