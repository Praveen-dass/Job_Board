package com.example.demo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Signup;

@Repository
public interface  SignupRepo extends JpaRepository<Signup,String> {

    
} 