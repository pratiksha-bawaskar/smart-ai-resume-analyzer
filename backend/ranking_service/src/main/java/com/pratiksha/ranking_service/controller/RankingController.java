package com.pratiksha.ranking_service.controller;

import com.pratiksha.ranking_service.entity.Ranking;
import com.pratiksha.ranking_service.service.RankingService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

@RestController
@RequestMapping("/ranking")
//@CrossOrigin(origins = "http://localhost:3000")
public class RankingController {

    @Autowired
    private RankingService rankingService;

    // ✅ FIXED:  service call होगा
    @GetMapping
    public List<Map<String, Object>> getRanking() {
        return rankingService.getRankingFromResumeService();
    }

    // ✅ DOWNLOAD CSV
    @GetMapping("/download-report")
    public void downloadReport(HttpServletResponse response) throws IOException {

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=report.csv");

        List<Map<String, Object>> rankingList = rankingService.getRankingFromResumeService();

        PrintWriter writer = response.getWriter();
        writer.println("ResumeId,Score,Remarks");

        for (Map<String, Object> r : rankingList) {

            String suggestion = String.valueOf(r.get("suggestion"))
                    .replace("[", "")
                    .replace("]", "")
                    .replace(",", " ");

            writer.println(
                r.get("userId") + "," +
                r.get("score") + "," +
                "\"" + suggestion + "\""
            );
        }

        writer.flush();
        writer.close();
    }
}