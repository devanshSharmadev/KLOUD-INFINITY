package com.kloudinfinty.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum BucketName {
    ToDo_Opr("kloud-infinity");
    private final String bucketName;
}
