package com.kloudinfinty.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document
@Builder
public class Shared {
    @Id
    private String id;
    private String toUser;
    private String sharedOn;
    private boolean writeAccess;
    private String fileId;
}
