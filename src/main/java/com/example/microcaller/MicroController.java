package com.example.microcaller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class MicroController {
    @RequestMapping("/getCustomers")
    @ResponseBody
    public List<Map<String, Object>> getCustomers(){
        String uri="http://148.231.233.122:3000/getCustomers";
        RestTemplate restTemplate=new RestTemplate();
        List<Map<String, Object>> result= restTemplate.getForObject(uri, List.class);
        return result;
    }

    @RequestMapping("/customer/{id}")
    @ResponseBody
    public List<Map<String, Object>> getCustomer(@PathVariable Integer id){
        String uri="http://148.231.233.122:3000/customer/"+id;
        RestTemplate restTemplate=new RestTemplate();
        List<Map<String, Object>> result= restTemplate.getForObject(uri, List.class);
        return result;
    }

    @PostMapping(value ="/saveCustomer")
    public @ResponseBody ResponseEntity<String> saveCustomer(@RequestParam("storeId")String storeId, @RequestParam("firstname")String firstname, @RequestParam("lastname")String lastname, @RequestParam("email")String email, @RequestParam("addressId")String addressId, @RequestParam("activebool")String activebool){
        List<String> array = Arrays.asList(storeId, firstname, lastname, email, addressId, activebool);
        String uri="http://148.231.233.122:3000/saveCustomer";
        HttpMethod method=HttpMethod.POST;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        RestTemplate restTemplate=new RestTemplate();
        HttpEntity<List<String>> reqEntity=new HttpEntity<List<String>>(array, headers);
        System.out.println(array);
        ResponseEntity<String> response = restTemplate.exchange(uri, method, reqEntity, String.class);
        return ResponseEntity.ok(response.getBody());
    }

    @RequestMapping("/getCountries")
    @ResponseBody
    public List<Map<String, Object>> getCountries(){
        String uri="http://148.231.233.122:3000/getCountries";
        RestTemplate restTemplate=new RestTemplate();
        List<Map<String, Object>> result= restTemplate.getForObject(uri, List.class);
        return result;
    }

    @RequestMapping("/getCityByCountryId/{id}")
    @ResponseBody
    public List<Map<String, Object>> getCityByCountryId(@PathVariable Integer id){
        String uri="http://148.231.233.122:3000/getCityByCountryId/"+id;
        RestTemplate restTemplate=new RestTemplate();
        List<Map<String, Object>> result= restTemplate.getForObject(uri, List.class);
        return result;
    }
}
