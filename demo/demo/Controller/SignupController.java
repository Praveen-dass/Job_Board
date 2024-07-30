package com.example.demo.Controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Signup;
import com.example.demo.Service.SignupService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SignupController {
    @Autowired
    private SignupService signService;
    @GetMapping("/get")
    public List<Signup> getmethod()
    {
        return signService.list();
    }

    @GetMapping("/admin/get/{id}")
    public Optional<Signup> getById(@PathVariable String id)
    {
        return signService.getId((id));
    }

    @PostMapping("/admin/post")
    public void postSign(@RequestBody Signup sign)
    {
        signService.postmethod(sign);
    }
    @PutMapping("/admin/put/{id}")
    public Signup putSign(@RequestBody Signup sign ,@PathVariable String id)
    {
        return signService.putmethod(sign,id);
    }
    @DeleteMapping("/admin/del/{id}")
    public void deleteIdSign(@PathVariable String id)
    {
        signService.deldata(id);
    }
    
    
    
    
    
}
