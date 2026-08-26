package com.pratiksha.ranking_service.job;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    public Job saveJob(@RequestBody Job job) {
        return jobService.saveJob(job);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/latest")
    public Job getLatestJob() {

        List<Job> jobs = jobService.getAllJobs();

        if(jobs.isEmpty()) {
            return null;
        }

        return jobs.get(jobs.size()-1);
    }
}