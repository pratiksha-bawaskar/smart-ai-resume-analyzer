package com.pratiksha.resume_service.util;

import java.util.ArrayList;
import java.util.List;

public class SkillExtractor {

    private static final String[] SKILLS = {

            "java",
            "spring",
            "spring boot",
            "hibernate",
            "mysql",
            "react",
            "aws",
            "docker",
            "kubernetes",
            "javascript",
            "html",
            "css",
            "python",
            "microservices"
    };

    public static List<String> extractSkills(String text){

        text = text.toLowerCase();

        List<String> foundSkills =
                new ArrayList<>();

        for(String skill : SKILLS){

            if(text.contains(skill)){
                foundSkills.add(skill);
            }
        }

        return foundSkills;
    }
}