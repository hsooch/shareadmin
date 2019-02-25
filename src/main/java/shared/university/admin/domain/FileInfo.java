package shared.university.admin.domain;

import lombok.Data;

/**
 * 저장된 파일 정보
 *
 * Created on 2018. 4. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Data
public class FileInfo {

    /** 원본 파일 명 **/
    public String oriFileName;

    /** 저장된 파일 명 **/
    public String saveFileName;

    /** 저장된 파일 전체 경로 **/
    public String saveFullPath;

    /** 파일 확장자 **/
    public String extension;

    /** Download URL **/
    public String downloadUrl;

    /** File Size **/
    public Long fileSize;

    /** DB 상에 저장될 유니크한 키값 **/
    public String fileKey;
}
