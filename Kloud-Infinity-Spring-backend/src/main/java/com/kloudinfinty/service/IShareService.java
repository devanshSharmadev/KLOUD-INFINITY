package com.kloudinfinty.service;

import com.kloudinfinty.model.Shared;
import org.springframework.stereotype.Service;


public interface IShareService {
    void add(Shared shared);
    Shared getById(String Id);
    String getIdByUsernameAndFileId(String username,String fileId);
}
