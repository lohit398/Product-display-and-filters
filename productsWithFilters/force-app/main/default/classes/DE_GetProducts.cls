public class DE_GetProducts {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(){
        return [SELECT Id,Name,Description,Image_URL__c,Family from Product2 ORDER BY Family,Name];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Product2> filterProducts(List<String> productFamilyFilters,List<String> themaFilters, List<String> Oplossingen_voor_filters,List<String> Loca_tie_filters, List<String> sortBy){
        String query = 'SELECT Id,Name,Description,Image_URL__c,Family from Product2 WHERE ';
        
        if(!productFamilyFilters.isEmpty()){
            query = query + 'Family IN :productFamilyFilters';
        }
        if(!themaFilters.isEmpty()){
            String thema = '';
            
            for(Integer i=0;i<themaFilters.size();i++){
                if(i+1!= themaFilters.size())
                    thema = thema +'\''+ themaFilters[i] + '\',';
                else
                    thema =  thema +'\''+ themaFilters[i] + '\'' ;
            }
            query = query + ' AND Thema__c includes ('+thema+')';
        }
        if(!Oplossingen_voor_filters.isEmpty()){
            String Oplossingen_voor = '';
            
            for(Integer j=0;j<Oplossingen_voor_filters.size();j++){
                if(j+1!= Oplossingen_voor_filters.size())
                    Oplossingen_voor = Oplossingen_voor +'\''+ Oplossingen_voor_filters[j] + '\',';
                else
                    Oplossingen_voor =  Oplossingen_voor +'\''+ Oplossingen_voor_filters[j] + '\'' ;
            }
            query = query + ' AND Oplossingen__c includes ('+Oplossingen_voor+')';
        }
        if(!Loca_tie_filters.isEmpty()){
            String loca_tie = '';
            
            for(Integer k=0;k<Loca_tie_filters.size();k++){
                if(k+1!= Loca_tie_filters.size())
                    loca_tie = loca_tie +'\''+ Loca_tie_filters[k] + '\',';
                else
                    loca_tie =  loca_tie +'\''+ Loca_tie_filters[k] + '\'' ;
            }
            query = query + ' AND Locatie__c  includes ('+loca_tie+')';
        }
        if(sortBy.size() == 2 || sortBy.isEmpty())
            query = query + ' ORDER BY Family,Name ASC';
        else if(sortBy.size() == 1){
            query = query + ' ORDER BY '+sortBy[0]+' ASC'; 
        }
        
        return Database.query(query);
    }
}