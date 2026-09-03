package com.pratiksha.resume_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;

import com.pratiksha.resume_service.entity.Resume;
import com.pratiksha.resume_service.repository.ResumeRepository;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
public class ResumeService {
	
	    @Autowired
	    private ResumeRepository resumeRepository;
	    
	    private final RestTemplate restTemplate =
	            new RestTemplate();

	    public Resume getResume(Long id) {
	        return resumeRepository.findById(id)
	                .orElseThrow(() ->
	                        new RuntimeException("Resume not found"));
	    }
	    
	    
	    public String extractEmail(String text) {

	        Pattern pattern =
	                Pattern.compile("[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+");

	        Matcher matcher =
	                pattern.matcher(text);

	        if (matcher.find()) {
	            return matcher.group();
	        }

	        return "Not Found";
	    }

	    public String extractPhone(String text) {

	        Pattern pattern =
	            Pattern.compile("(\\+91\\s?)?[6-9]\\d{9}");

	        Matcher matcher =
	            pattern.matcher(text);

	        if (matcher.find()) {
	            return matcher.group();
	        }

	        return "Not Found";
	    }
    // 🔥 MAIN LOGIC METHOD
	    public int analyzeResume(String resumeText) {

	        try {

	            String url =
	                    "http://localhost:8083/jobs/latest";

	            Map job =
	                    restTemplate.getForObject(url, Map.class);

	            if(job == null) {
	                return 50;
	            }

	            String requiredSkills =
	                    job.get("requiredSkills").toString();

	            String[] skills =
	                    requiredSkills.split(",");

	            int matched = 0;

	            for(String skill : skills) {

	                if(resumeText.toLowerCase()
	                        .contains(skill.trim().toLowerCase())) {

	                    matched++;
	                }
	            }

	            int score =
	                    (matched * 100) / skills.length;

	            return score;

	        }
	        catch(Exception e) {

	            e.printStackTrace();

	            return 50;
	        }
	    }
	    
	    public List<String> getMissingSkills(
	            String resumeText,
	            String requiredSkills) {

	        List<String> missingSkills =
	                new ArrayList<>();

	        String[] skills =
	                requiredSkills.split(",");

	        for(String skill : skills){

	            if(!resumeText.toLowerCase()
	                    .contains(skill.trim().toLowerCase())){

	                missingSkills.add(skill.trim());
	            }
	        }

	        return missingSkills;
	    }
	    
	    public String generateSuggestion(
	            List<String> missingSkills,
	            int score) {

	        if(score >= 80) {
	            return "Strong profile. Ready for interview.";
	        }

	        if(missingSkills.isEmpty()) {
	            return "Good profile. Improve project descriptions.";
	        }

	        return "Add these skills: " +
	                String.join(", ", missingSkills);
	    }
	    }