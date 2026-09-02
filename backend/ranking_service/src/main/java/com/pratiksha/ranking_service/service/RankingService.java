package com.pratiksha.ranking_service.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pratiksha.ranking_service.dto.ResumeDTO;
import com.pratiksha.ranking_service.entity.Ranking;
import com.pratiksha.ranking_service.repository.RankingRepository;

@Service
public class RankingService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RankingRepository rankingRepository;

    // ✅ THIS SHOULD BE HERE (NO @GetMapping)
    public List<Map<String, Object>> getRankingFromResumeService() {

        String url = "https://resume-service-gf33.onrender.com/resumes/ranking";

        List<Map<String, Object>> data =
            restTemplate.getForObject(url, List.class);

        return data;
    }

    public List<Ranking> getAllRankings() {
        return rankingRepository.findAll();
    }

    public Map<Long, Integer> calculateRanking() {

        String url = "http://localhost:8082/resumes";

        ResumeDTO[] resumes = restTemplate.getForObject(url, ResumeDTO[].class);

        Map<Long, Integer> ranking = new HashMap<>();

        for (ResumeDTO resume : resumes) {
        	int score = resume.getScore();
            ranking.put(resume.getUserId(), score);
        }

        return ranking;
    }
}