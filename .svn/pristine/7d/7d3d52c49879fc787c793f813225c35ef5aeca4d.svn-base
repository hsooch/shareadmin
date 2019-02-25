package shared.university.admin.controller;

import kr.co.kcp.CT_CLI;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.epki.api.EpkiApi;
import com.epki.cert.CertValidator;
import com.epki.cert.X509Certificate;
import com.epki.cms.EnvelopedData;
import com.epki.cms.SignedData;
import com.epki.conf.ServerConf;
import com.epki.crypto.Cipher;
import com.epki.crypto.PrivateKey;
import com.epki.crypto.SecretKey;
import com.epki.exception.CertificateExpiredException;
import com.epki.exception.CertificateRevokedException;
import com.epki.exception.EpkiException;
import com.epki.util.Base64;

import shared.university.admin.AppProperties;
import shared.university.admin.service.MailAuthService;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * KCP 휴대폰 본인인증
 * 
 * Created on 2018. 3. 30.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Controller
@Slf4j
@RequestMapping("/cert")
public class CertificationController {
	
	@Autowired
	private MailAuthService mailAuthService;

	private final String ENC_KEY = AppProperties.getProperty("kcp.cert.enc.key");
	private final String SITE_CD = AppProperties.getProperty("kcp.cert.site.code");
	private final String WEB_SITEID = AppProperties.getProperty("kcp.cert.webSite.code");
	private final String CERT_ABLE_YN = AppProperties.getProperty("kcp.cert.ableYn");
	private final String WEBSITE_ID_HASHYN = AppProperties.getProperty("kcp.cert.webSiteId.hashYn");
	
	/**
     * 본인인증 요청 팝업 화면
     *
     * @param 본인인증 사용자 정보 맵o
     * @return Model
     * @throws Exception java.lang
     */
	@SuppressWarnings("static-access")
	@RequestMapping("/kcpCertificationReq")
	public String kcpCertificationReq(@RequestParam Map<String, Object> paramMap, Model model) {
		String DOMAIN = AppProperties.getProperty("admin.server.domain");
		String RET_URL = AppProperties.getProperty("kcp.cert.return.url");
		String ORDR_IDXX = "SHAREDUNIVERSITY" + (new SimpleDateFormat("yyyyMMddHHmmssSSSSSSS").format(new Date()));
		//String ORDR_IDXX = "SPORTSMONSTER" + (new SimpleDateFormat("yyyyMMddHHmmssSSSSSSS").format(new Date()));

		CT_CLI cc = new CT_CLI();
		String upHash = "";

		paramMap.put("siteCd", SITE_CD);
		paramMap.put("webSiteId", WEB_SITEID);
		paramMap.put("ordrIdxx", ORDR_IDXX);
		paramMap.put("retURL", DOMAIN+RET_URL);
		paramMap.put("certAbleYn", CERT_ABLE_YN);
		paramMap.put("webSiteIdHashYN", WEBSITE_ID_HASHYN);

		log.info("1. paramMap {} " + paramMap);
		if("cert".equals(paramMap.get("reqTx"))) {
			// !!upHash 데이터 생성시 주의 사항
	        // year , month , day 가 비어 있는 경우 "00" , "00" , "00" 으로 설정이 됩니다
	        // 그외의 값은 없을 경우 ""(null) 로 세팅하시면 됩니다.
	        // upHash 데이터 생성시 site_cd 와 ordr_idxx 는 필수 값입니다.
	        if(("Y").equals(paramMap.get("certAbleYn")) ) {
	        	upHash = cc.makeHashData( ENC_KEY, SITE_CD +
	                                       ORDR_IDXX +
	                                       (("Y").equals(paramMap.get("webSiteIdHashYN"))? WEB_SITEID : "" ) +
	                                       ""   +
	                                       "00" +
	                                       "00" +
	                                       "00" +
	                                       ""   +
	                                       ""
	                                    );
	        } else {
	        	upHash = cc.makeHashData( ENC_KEY, SITE_CD   +
	                                       ORDR_IDXX +
	                                       (("Y").equals(paramMap.get("webSiteIdHashYN"))? WEB_SITEID : "" ) +
	                                       	StringUtil.nvltoStr(paramMap.get("popPtcNm"),"") +
	                                       	StringUtil.nvltoStr(paramMap.get("popBrthYear"),"") +
	        								StringUtil.nvltoStr(paramMap.get("popBrthMonth"),"") +
											StringUtil.nvltoStr(paramMap.get("popBrthDate"),"") +
											StringUtil.nvltoStr(paramMap.get("popPtcSexDstn"),"")  +
											StringUtil.nvltoStr(paramMap.get("popPtcLocalCd"),"")
	                                    );
	        }
	        cc = null; // 객체 해제
		}
	    paramMap.put("upHash", upHash);
		log.info("2. paramMap {} " + paramMap);
		model.addAttribute("paramMap", paramMap);

		return "certification/certificationReqPop";
	}

	/**
     * 본인인증 응답처리 팝업
     *
     * @param 본인인증 결과 request객체
     * @return Model
     * @throws Exception java.lang
     */
	@RequestMapping("/kcpCertificationRes")
	public String kcpCertificationRes(HttpServletRequest request, Model model) {
		log.info("----------------- kcpCertificationRes -----------------------");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		Map<String, Object> returnMap = new HashMap<String, Object>();
		Map<String, Object> testMap = new HashMap<String, Object>();
		CT_CLI cc = new CT_CLI();
		Enumeration params = request.getParameterNames();

		while(params.hasMoreElements())
	    {
	        String nmParam = (String) params.nextElement();
	        String valParam[] = request.getParameterValues(nmParam);

	        for(int i = 0; i < valParam.length; i++)
	        {
	        	testMap.put(nmParam, valParam[i]);
	        	switch(nmParam){
	        		case "site_cd":			paramMap.put("siteCd", StringUtil.nvltoStr(valParam[i],""));		break;
	        		case "ordr_idxx":		paramMap.put("ordrIdxx", StringUtil.nvltoStr(valParam[i],""));		break;
	        		case "res_cd": 			paramMap.put("resCd", StringUtil.nvltoStr(valParam[i],"")); 		break;
	        		case "cert_enc_use":	paramMap.put("certEncUse", StringUtil.nvltoStr(valParam[i],""));	break;
	        		case "req_tx":			paramMap.put("reqTx", StringUtil.nvltoStr(valParam[i],""));			break;
	        		case "cert_no":			paramMap.put("certNo", StringUtil.nvltoStr(valParam[i],""));		break;
	        		case "enc_cert_data": 	paramMap.put("encCertData", StringUtil.nvltoStr(valParam[i],""));	break;
	        		case "dn_hash":			paramMap.put("dnHash", StringUtil.nvltoStr(valParam[i],""));		break;
	        		case "param_opt_1": 	returnMap.put("certType", StringUtil.nvltoStr(valParam[i],""));		break;
	            }
	        }
	    }

		if("Y".equals(paramMap.get("certEncUse"))) {
        	if("0000".equals(paramMap.get("resCd"))) {
        		// dn_hash 검증
                // KCP 가 리턴해 드리는 dn_hash 와 사이트 코드, 주문번호 , 인증번호를 검증하여
                // 해당 데이터의 위변조를 방지합니다
                if ( !cc.checkValidHash( ENC_KEY, paramMap.get("dnHash").toString(), ( paramMap.get("siteCd").toString() + paramMap.get("ordrIdxx").toString() + paramMap.get("certNo").toString() )))
                {
                	model.addAttribute("resultMsg", "mem.login.wrongAccess");
            		return "/index";
                }

                cc.decryptEncCert( ENC_KEY, paramMap.get("siteCd").toString(), paramMap.get("certNo").toString(), paramMap.get("encCertData").toString() );
                returnMap.put("commId", cc.getKeyValue("comm_id")); // 이동통신사 코드
                returnMap.put("phoneNo", cc.getKeyValue("phone_no")); // 전화번호
                returnMap.put("userName", cc.getKeyValue("user_name")); // 이름
                returnMap.put("birthDay", cc.getKeyValue("birth_day")); // 생년월일
                returnMap.put("sexCode", cc.getKeyValue("sex_code")); // 성별코드
                returnMap.put("localCode", cc.getKeyValue("local_code")); // 내/외국인 정보
                returnMap.put("ci", cc.getKeyValue("ci")); // CI
                returnMap.put("di", cc.getKeyValue("di")); // DI 중복가입 확인값
                //returnMap.put("ciURL", URLDecoder.decode(cc.getKeyValue("ci_url"))); // CI URL 인코딩 값
                //returnMap.put("diURL", URLDecoder.decode( cc.getKeyValue("di_url"))); // DI URL 인코딩 값
                // 디코딩하면 ci,di 값과 같아짐.
                returnMap.put("ciURL", cc.getKeyValue("ci_url")); // CI URL 인코딩 값
                returnMap.put("diURL", cc.getKeyValue("di_url")); // DI URL 인코딩 값
                returnMap.put("webSiteId", cc.getKeyValue("web_siteid")); // 암호화된 웹사이트 아이디
                returnMap.put("resCd", cc.getKeyValue("res_cd")); // 암호화된 결과코드
                returnMap.put("resMsg", cc.getKeyValue("res_msg")); // 암호화된 결과메시지
                returnMap.put("certResult", "Y");
        	}
        }

		cc = null;
		model.addAttribute("returnMap", returnMap);
		model.addAttribute("testMap", testMap);

        return "certification/certificationResPop";
    }

	/**
     * 메일인증 요청 메일 전송
     *
     * @param 메일인증 요청 메일 정보
     * @return Map
     * @throws Exception java.lang
     */
	@RequestMapping("/emailCertificationReq")
	@ResponseBody
	public Map<String, Object> emailCertificationReq(@RequestParam Map<String, Object> paramMap) throws Exception {
        return mailAuthService.sendMailAuth(paramMap);
	}
	
	/**
     * 메일인증 응답
     *
     * @param 메일인증 응답
     * @return Map
     * @throws Exception java.lang
     */
	@RequestMapping("/emailCertificationRes")
	public String emailCertificationRes(@RequestParam Map<String, Object> paramMap, Model model) throws Exception {
		
		model.addAttribute("resultMap", mailAuthService.confirmMailAuth(paramMap));
		
		return "certification/emailCertificationResPop";
	}
	
	/**
     * 메일인증 확인
     *
     * @param 메일인증 확인
     * @return Map
     * @throws Exception java.lang
     */
	@RequestMapping("/emailCertificationCheck")
	@ResponseBody
	public Map<String, Object> emailCertificationCheck(@RequestParam Map<String, Object> paramMap) throws Exception {
        return mailAuthService.checkMailAuth(paramMap);
	}
	
	/**
	 * EPKI 인증 초기화
	 */
	@RequestMapping("/initEpki")
	@ResponseBody
	public Map<String, Object> initEpki(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		HttpSession m_Session = request.getSession();
		String sessionID = m_Session.getId();
		
		String strServerCert = "";
		
	    //  epki-java 초기화
	    EpkiApi.initApp();
	
	    byte[] bsserverCert = null;
	
	    // server.conf 파일로 부터 서버에 설정된 인증서 및 개인키의 경로 정보를 얻음
	    ServerConf conf = new ServerConf();
	
	    // 복호화를 위한 키관리용 인증서 설정
	    X509Certificate cert = conf.getServerCert(ServerConf.CERT_TYPE_KM);
	
	    bsserverCert = cert.getCert();
	
	    // 서버인증서 Base64 인코딩
	    Base64 encoder = new Base64();
	    strServerCert = encoder.encode(bsserverCert);
	    
	    resultMap.put("sessionID", sessionID);
	    resultMap.put("strServerCert", strServerCert);
	    
		return resultMap;
	}

	/**
	 * EPKI 인증 요청 세션 세팅
	 * 
	 * @param EPKI 인증 성공 결과값
	 * @return Map 복호화 값
	 * @throws Exception java.lang
	 */
	
	@RequestMapping("/setRequestSessionEpki")
	@ResponseBody
	public Map<String, Object> setRequestSessionEpki(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
	    HttpSession m_Session = request.getSession();
	    String sessionID = m_Session.getId();

	    String requestMessage = request.getParameter("secureChannelRequest");
	    String testResult = "";

	    String strAlgID = "";
	    String strSessionKey = "";
	    String strSessionIV = "";
		
	    try {
	        EpkiApi.initApp();

			Base64 b64 = new Base64();
	        byte[] bsessionKey = null;
	        byte[] bsessionIV = null;

	        ServerConf serverConf = new ServerConf();
			
	        X509Certificate cert = serverConf.getServerCert(ServerConf.CERT_TYPE_KM);
	        PrivateKey priKey = serverConf.getServerPriKey(ServerConf.CERT_TYPE_KM);
	        
	        EnvelopedData envloped = new EnvelopedData();
			byte[] developedData = envloped.develop(b64.decode(requestMessage), cert, priKey);
			SecretKey secretKey = envloped.getSecretKey();

	        strAlgID = secretKey.getKeyAlg();
	        bsessionKey = secretKey.getKey();
	        bsessionIV = secretKey.getIV();

	        // 세션키 Base64 인코딩
	        Base64 encoder = new Base64();
	        strSessionKey = encoder.encode(bsessionKey);
	        strSessionIV = encoder.encode(bsessionIV);

	        m_Session.setAttribute("sessionKey",strSessionKey);
	        m_Session.setAttribute("sessionIV",strSessionIV);
	        m_Session.setAttribute("algorithm", strAlgID);

			if(strAlgID == "DESEDE"){
				strAlgID = "3DES";
			}

	        testResult = "성공";

	    } catch (EpkiException e) {
	        testResult = e.toString();
	    }
	    
	    resultMap.put("testResult", testResult);
	    
		return resultMap;
	}
	
	/**
	 * EPKI 인증 결과값 복호화
	 * 
	 * @param EPKI 인증 성공 결과값
	 * @return Map 복호화 값
	 * @throws Exception java.lang
	 */
	
	@RequestMapping("/decodeEpkiCertificationResult")
	@ResponseBody
	public Map<String, Object> decodeEpkiCertificationResult(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
	    HttpSession m_Session = request.getSession();
	    String sessionID = m_Session.getId();

	    String loginRequestData = (String)paramMap.get("loginRequest");//request.getParameter("loginRequest");

	    String testResult = "";

	    String subjectDn = "";
	    String issuerDn = "";
	    BigInteger bserial = null;
	    
	    String strSessionKey = (String)m_Session.getAttribute("sessionKey");
	    String strSessionIV = (String)m_Session.getAttribute("sessionIV");
	    String strAlgID = (String)m_Session.getAttribute("algorithm");
	    
	    log.info("strSessionKey => {}", strSessionKey);
	    log.info("strSessionIV => {}", strSessionIV);
	    log.info("strAlgID => {}", strAlgID);
		
	    try {
	        EpkiApi.initApp();

	        byte[] bsessionKey = null;
	        byte[] bsessionIV = null;
	        byte[] bencryptedData = null;
	        byte[] bdecryptData = null;

	        // 세션키 Base64 디코딩
	        Base64 base64 = new Base64();
	        bsessionKey = base64.decode(strSessionKey);
	        bsessionIV = base64.decode(strSessionIV);

	        SecretKey secretKey = new SecretKey(strAlgID, bsessionKey, bsessionIV);

	        ServerConf serverConf = new ServerConf();
	        X509Certificate cert = serverConf.getServerCert(ServerConf.CERT_TYPE_KM);

	        PrivateKey priKey = serverConf.getServerPriKey(ServerConf.CERT_TYPE_KM);
			
			Cipher cipher = Cipher.getInstance(secretKey.getKeyAlg());
			cipher.init(Cipher.DECRYPT_MODE, secretKey);
					
	        byte[] decryptedLoginData = cipher.doFinal(base64.decode(loginRequestData));
	        
			SignedData signedData = new SignedData();
			signedData.verify(decryptedLoginData);

			byte[] plainBytes = signedData.getMessage();

			// JSON Parse Start
			JSONObject reqJsonData = (JSONObject) JSONValue.parse(new String(plainBytes));

	        X509Certificate loginCert = signedData.getSignerCert(0);
	        String rNumber = (String) reqJsonData.get("RN");
	        String vid = (String) reqJsonData.get("VID");
			
	        if(vid != null) {
	            // 요청자 신원확인 정보 검증
	            loginCert.verifyVID(base64.decode(rNumber), vid);
	        }

	        // 요청자 인증서 검증
	        CertValidator validator = new CertValidator();

	        // 인증서 검증 옵션 지정
	        validator.setValidateCertPathOption(CertValidator.CERT_VERIFY_FULLPATH);
	        
			// [기본 설정]
			// SCVP 검증
			String scvpUrl = "http://scvp.epki.go.kr:8080";			// SCVP 검증서버 IP:PORT
			validator.setValidateRevokeOption(CertValidator.REVOKE_CHECK_SCVP);
			validator.setSCVPUrl(scvpUrl);
			validator.setServerSignCert( serverConf.getServerCert(ServerConf.CERT_TYPE_SIGN),serverConf.getServerPriKey(ServerConf.CERT_TYPE_SIGN));
	        
	        // CRL 검증
	        //validator.setValidateRevokeOption(CertValidator.REVOKE_CHECK_CRL);

	        // ARL,CRL 검증
	        //validator.setValidateRevokeOption(CertValidator.REVOKE_CHECK_ARL | CertValidator.REVOKE_CHECK_CRL);

	        // NONE
	        //validator.setValidateRevokeOption(CertValidator.REVOKE_CHECK_NONE);

	        // OCSP 검증
	        // 사용자 인증서 내 AIA 필드에 OCSP 서버 정보가 없을 경우 server.conf 내 OCSP_Server 변수에 기본 OCSP 검증 서버 설정 가능
	        // validator.setServerSignCert( serverConf.getServerCert(ServerConf.CERT_TYPE_SIGN),serverConf.getServerPriKey(ServerConf.CERT_TYPE_SIGN));
	        // validator.setValidateRevokeOption(CertValidator.REVOKE_CHECK_OCSP);
	        validator.validate(CertValidator.CERT_TYPE_SIGN, loginCert);

	        // 요청자 인증서 정보 획득
	        subjectDn = loginCert.getSubjectName();
	        issuerDn = loginCert.getIssuerName();
	        bserial = new BigInteger("1");
	        bserial = loginCert.getSerialNumber();
		
	        testResult = "성공";

	    } catch (CertificateExpiredException e) {
	        testResult = "유효기간이 만료된 인증서입니다. " + e.toString();
	    } catch (CertificateRevokedException e) {
	        testResult = "폐지된 인증서입니다. " + e.toString();
	    } catch (EpkiException e) {
	        testResult = e.toString();
	    }
	    
	    resultMap.put("subjectDn", subjectDn);
	    resultMap.put("issuerDn", issuerDn);
	    resultMap.put("bserial", bserial.toString());
	    resultMap.put("testResult", testResult);
	    
		return resultMap;
	}
}
