package com.kloudinfinty.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document
public class FileModel {
    @Id
    private String id;
    private String title;
    private String fileName;
    private String contentType;
    private String uploadDate;
    private boolean isOwn;// isOwn , private
    private String lastModification;
    private String filePath;
    private String username;
    private boolean starred;
    private List<Shared> sharedTo;
}
