package com.example.demo.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Job;
import com.example.demo.Service.JobService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/job")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {
    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/addJob")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        return new ResponseEntity<>(jobService.addJob(job), HttpStatus.OK);
    }

    // @GetMapping("/getJob")
    // public String getMethodName(@RequestParam String param) {
    //     return new String();
    // }
    

    @GetMapping("/getJob")
    public ResponseEntity<List<Job>> getUser() {
        List<Job> jobs = jobService.getJobs();
        if (jobs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @GetMapping("/byField")
    public ResponseEntity<List<Job>> getUserByField()
    {
        return null;
    }

    @PutMapping("updateJob/{id}")
    public String updateUser(@PathVariable int id, @RequestBody Job job) {
        return jobService.updateUser(id, job);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getId(@PathVariable int id) {
        Job job = jobService.getId(id);
        if (job == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(job, HttpStatus.OK);
    }


    @DeleteMapping("deleteJob/{id}")
    public String deleteUser(@PathVariable int id) {
        return jobService.deleteUser(id);
    }

}