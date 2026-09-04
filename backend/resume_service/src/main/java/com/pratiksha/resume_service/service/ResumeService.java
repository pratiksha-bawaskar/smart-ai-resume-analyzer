package com.pratiksha.resume_service.service;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.pratiksha.resume_service.entity.Resume;
import com.pratiksha.resume_service.repository.ResumeRepository;

import java.util.List;
import java.util.ArrayList;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

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

        if (resumeText == null || resumeText.trim().isEmpty()) {
            return 0;
        }

        int score = 0;

        String text =
                resumeText.toLowerCase();

        // Resume content checks
        if (text.contains("education")) {
            score += 15;
        }

        if (text.contains("experience")) {
            score += 20;
        }

        if (text.contains("skills")) {
            score += 20;
        }

        if (text.contains("project")) {
            score += 20;
        }

        if (text.contains("email")) {
            score += 5;
        }

        if (text.contains("phone") ||
                text.contains("mobile")) {
            score += 5;
        }

        if (text.contains("java")) {
            score += 5;
        }

        if (text.contains("spring")) {
            score += 5;
        }

        if (score > 100) {
            score = 100;
        }

        return score;
    }

    public List<String> getMissingSkills(
            String resumeText,
            String requiredSkills) {

        List<String> missingSkills =
                new ArrayList<>();

        // No job skills available
        if (requiredSkills == null ||
                requiredSkills.trim().isEmpty()) {

            return missingSkills;
        }

        String[] skills =
                requiredSkills.split(",");

        for (String skill : skills) {

            if (!resumeText.toLowerCase()
                    .contains(skill.trim().toLowerCase())) {

                missingSkills.add(skill.trim());
            }
        }

        return missingSkills;
    }

    public String generateSuggestion(
            List<String> missingSkills,
            int score) {

        if (score >= 80) {

            return "Strong profile. Ready for interview.";
        }

        if (missingSkills.isEmpty()) {

            return "Good profile. Improve project descriptions.";
        }

        return "Add these skills: " +
                String.join(", ", missingSkills);
    }
}